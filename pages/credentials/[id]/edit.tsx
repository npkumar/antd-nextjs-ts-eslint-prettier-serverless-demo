import React from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, PageHeader, Space } from 'antd'
import useSWR from 'swr'
import { EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import DeleteCredentialButton from '../../../components/DeleteCredentialButton'

// @see https://stackoverflow.com/questions/64199630/problem-with-typescript-while-making-request-to-swr
const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

const CredentialsEdit: React.FC = () => {
  const router = useRouter()
  const { query } = router
  const [form] = Form.useForm()

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/comments/${query.id}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>

  if (!data) return <div>Loading...</div>

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
      <PageHeader
        backIcon={false}
        title="Edit Credential"
        extra={[
          <Link key="view" href={`/credentials/${data?.id}`}>
            <Button icon={<EyeOutlined />}>View</Button>
          </Link>,
          <DeleteCredentialButton key="delete" username={data?.email} />,
        ]}
      />

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
          initialValue={data?.email}
          rules={[{ required: true, message: 'Please input system Id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hotel Name"
          name="hotelName"
          initialValue={data?.email}
          rules={[{ required: true, message: 'Please input hotel name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          initialValue={data?.email}
          rules={[{ required: true, message: 'Please input username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          initialValue={data?.email}
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

export default CredentialsEdit
