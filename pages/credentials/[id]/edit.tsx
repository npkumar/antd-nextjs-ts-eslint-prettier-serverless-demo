import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, PageHeader, Space, notification, Skeleton } from 'antd'
import useSWR, { mutate } from 'swr'
import { EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import DeleteCredentialButton from '../../../components/DeleteCredentialButton'
import Failure from '../../../components/Failure'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/comments/${query.id}`,
    fetcher
  )

  if (error) return <Failure />

  if (!data) return <Skeleton active title paragraph={{ rows: 8 }} />

  const onFinish = (values: any) => {
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
    })
      .then(() => {
        console.log(values)
        setIsLoading(false)

        // Revalidate key
        mutate(`https://jsonplaceholder.typicode.com/comments/${query.id}`)
        // And redirect
        router.push(`/credentials/${query.id}`)

        notification.info({
          message: 'Successful!',
          description: `Updated credential`,
          placement: 'topRight',
        })
      })
      .catch((e) => {
        console.error(e)
        setIsLoading(false)
        notification.error({
          message: 'Something went wrong!',
          description: `Could not update`,
          placement: 'topRight',
        })
      })
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
          <DeleteCredentialButton key="delete" id={data?.id} username={data?.email} />,
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
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
