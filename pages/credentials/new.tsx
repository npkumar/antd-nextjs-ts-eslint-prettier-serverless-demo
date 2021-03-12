import React from 'react'
import { Button, Form, Input, PageHeader, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

const CredentialsNew: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onReset = () => {
    form.resetFields()
  }

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
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default CredentialsNew
