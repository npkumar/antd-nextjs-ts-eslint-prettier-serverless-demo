import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, PageHeader, Space, notification, Skeleton } from 'antd';
import { mutate } from 'swr';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import DeleteCredentialButton from '../../../client/components/DeleteCredentialButton';
import Failure from '../../../client/components/Failure';
import CredentialStatus from '../../../client/components/CredentialStatus';
import { HOTEL_CREDENTIAL, HOTEL_CREDENTIAL_STATUS } from '../../../client/types/credentials';
import { updateCredential, useCredential } from '../../../client/api/hotelCredentials';

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

  //@ts-ignore
  const { credential, isError, isLoading: isViewLoading } = useCredential(query.id);

  if (isError) return <Failure />;

  if (isViewLoading) return <Skeleton active title paragraph={{ rows: 8 }} />;

  const onFinish = async (values: HOTEL_CREDENTIAL) => {
    try {
      setIsLoading(true);
      //@ts-ignore
      await updateCredential(query.id, values);

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
    } catch (err) {
      setIsLoading(false);
      notification.error({
        message: 'Something went wrong!',
        description: 'Could not update',
        placement: 'topRight',
      });
    }
  };

  return (
    <>
      <PageHeader
        backIcon={false}
        title="Edit Credential"
        extra={[
          <CredentialStatus key="status" status={credential.status} />,
          <Link key="view" href={`/credentials/${credential.id}`}>
            <Button icon={<EyeOutlined />}>View</Button>
          </Link>,
          credential.status === HOTEL_CREDENTIAL_STATUS.ACTIVE && (
            <DeleteCredentialButton
              key="delete"
              id={credential.id}
              hotelName={credential.hotelName}
            />
          ),
        ]}
      />

      <Form {...layout} form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Hotel Name"
          name="hotelName"
          initialValue={credential.hotelName}
          rules={[{ required: true, message: 'Please input hotel name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="System Id"
          name="systemId"
          initialValue={credential.systemId}
          rules={[{ required: true, message: 'Please input system Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS User Id"
          name="pmsUserId"
          initialValue={credential.pmsUserId}
          rules={[{ required: true, message: 'Please input PMS User Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS Password"
          name="pmsPassword"
          initialValue={credential.pmsPassword}
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
