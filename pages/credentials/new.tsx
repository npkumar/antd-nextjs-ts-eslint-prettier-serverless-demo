import React, { useState } from 'react';
import { Button, Form, Input, notification, PageHeader, Space } from 'antd';
import { useRouter } from 'next/router';

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
    return new Promise((resolve, reject) => {
      setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    })
      .then(() => {
        console.log(values);
        setIsLoading(false);

        // TODO: Redirect to correct Id
        router.push(`/credentials/1`);

        notification.info({
          message: 'Successful!',
          description: `Updated credential`,
          placement: 'topRight',
        });
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
        notification.error({
          message: 'Something went wrong!',
          description: `Could not update`,
          placement: 'topRight',
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageHeader backIcon={false} title="Create new credential" />

      <Form
        {...layout}
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="System Id"
          name="systemId"
          rules={[{ required: true, message: 'Please input system Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hotel Name"
          name="hotelName"
          rules={[{ required: true, message: 'Please input hotel name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset} loading={isLoading}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CredentialsNew;
