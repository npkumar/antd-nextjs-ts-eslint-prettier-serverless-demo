import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, PageHeader, Space, notification, Skeleton } from 'antd';
import { mutate } from 'swr';
import { EyeOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import DeleteCredentialButton from '../../../client/components/DeleteCredentialButton';
import Failure from '../../../client/components/Failure';
import CredentialStatus from '../../../client/components/CredentialStatus';
import { HOTEL_CREDENTIAL, HOTEL_CREDENTIAL_STATUS } from '../../../client/types/credentials';
import { updateCredential, useCredential } from '../../../client/api/hotelCredentials';
import { getQueryValue } from '../../../client/util';

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

  const credentialId = getQueryValue(query.id);
  const { credential, isError, isLoading: isViewLoading } = useCredential(credentialId);

  if (isError) return <Failure />;

  if (isViewLoading) return <Skeleton active title paragraph={{ rows: 8 }} />;

  const onFinish = async (values: HOTEL_CREDENTIAL) => {
    try {
      setIsLoading(true);
      const credential = await updateCredential(credentialId, values);

      // Revalidate key
      mutate(`/api/hotelcredentials/${credential.id}`);
      // And redirect
      router.push(`/credentials/${credential.id}`);

      notification.info({
        message: 'Successful!',
        description: 'Updated credential',
        placement: 'topRight',
      });
    } catch (err) {
      notification.error({
        message: 'Something went wrong!',
        description: 'Could not update',
        placement: 'topRight',
      });
    } finally {
      setIsLoading(false);
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
          label="Hotel Id"
          name="hotelId"
          initialValue={credential.hotelId}
          rules={[{ required: true, message: 'Please input hotel Id!' }]}
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
            <Button type="primary" htmlType="submit" loading={isLoading} icon={<SendOutlined />}>
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
