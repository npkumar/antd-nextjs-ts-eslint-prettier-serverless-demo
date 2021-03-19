import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, PageHeader, Space, notification, Skeleton } from 'antd';
import useSWR, { mutate } from 'swr';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import DeleteCredentialButton from '../../../client/components/DeleteCredentialButton';
import Failure from '../../../client/components/Failure';
import axios from 'axios';
import CredentialStatus from '../../../client/components/CredentialStatus';
import { HOTEL_CREDENTIAL_STATUS } from '../../../client/types/credentials';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const CredentialsEdit: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, error } = useSWR(`/api/hotelcredentials/${query.id}`, fetcher);

  if (error) return <Failure />;

  if (!data) return <Skeleton active title paragraph={{ rows: 8 }} />;

  const onFinish = (values: any) => {
    setIsLoading(true);
    axios
      .put(`/api/hotelcredentials/${query.id}`, { ...values })
      .then(() => {
        setIsLoading(false);

        // Revalidate key
        mutate(`/api/hotelcredentials/${query.id}`);
        // And redirect
        router.push(`/credentials/${query.id}`);

        notification.info({
          message: 'Successful!',
          description: 'Updated credential',
          placement: 'topRight',
        });
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Something went wrong!',
          description: 'Could not update',
          placement: 'topRight',
        });
      });
  };

  return (
    <>
      <PageHeader
        backIcon={false}
        title="Edit Credential"
        extra={[
          <CredentialStatus key="status" status={data.status} />,
          <Link key="view" href={`/credentials/${data.id}`}>
            <Button icon={<EyeOutlined />}>View</Button>
          </Link>,
          data.status === HOTEL_CREDENTIAL_STATUS.ACTIVE && (
            <DeleteCredentialButton key="delete" id={data?.id} hotelName={data?.hotelName} />
          ),
        ]}
      />

      <Form {...layout} form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Hotel Name"
          name="hotelName"
          initialValue={data.hotelName}
          rules={[{ required: true, message: 'Please input hotel name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="System Id"
          name="systemId"
          initialValue={data.systemId}
          rules={[{ required: true, message: 'Please input system Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS User Id"
          name="pmsUserId"
          initialValue={data.pmsUserId}
          rules={[{ required: true, message: 'Please input PMS User Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS Password"
          name="pmsPassword"
          initialValue={data?.pmsPassword}
          rules={[{ required: true, message: 'Please input PMS password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CredentialsEdit;
