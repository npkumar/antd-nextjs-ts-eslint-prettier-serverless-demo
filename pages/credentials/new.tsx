import React, { useState } from 'react';
import { Button, Form, Input, notification, PageHeader, Space } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const CredentialsNew: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setIsLoading(true);

    axios
      .post('http://localhost:8080/api/v0.1/hotelcredentials', { ...values })
      .then((result) => {
        setIsLoading(false);

        router.push(`/credentials/${result.data.id}`);

        notification.info({
          message: 'Successful!',
          description: `Updated credential`,
          placement: 'topRight',
        });
      })
      .catch(() => {
        setIsLoading(false);
        notification.error({
          message: 'Something went wrong!',
          description: `Could not update`,
          placement: 'topRight',
        });
      });
  };

  return (
    <>
      <PageHeader backIcon={false} title="Create new credential" />

      <Form {...layout} form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Hotel Name"
          name="hotelName"
          rules={[{ required: true, message: 'Please input hotel name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="System Id"
          name="systemId"
          rules={[{ required: true, message: 'Please input system Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS User Id"
          name="pmsUserId"
          rules={[{ required: true, message: 'Please input PMS User Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PMS Password"
          name="pmsPassword"
          rules={[{ required: true, message: 'Please input PMS Password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()} loading={isLoading}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CredentialsNew;
