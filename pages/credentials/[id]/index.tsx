import React from 'react'
import { useRouter } from 'next/router'
import { Button, Form, PageHeader } from 'antd'
import useSWR from 'swr'
import Text from 'antd/lib/typography/Text'
import Link from 'next/link'
import { EditOutlined, PlusSquareOutlined } from '@ant-design/icons'

// @see https://stackoverflow.com/questions/64199630/problem-with-typescript-while-making-request-to-swr
const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const CredentialsView: React.FC = () => {
  const router = useRouter()
  const { query } = router

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/comments/${query.id}`,
    fetcher
  )

  if (error) return <div>Failed to load</div>

  if (!data) return <div>Loading...</div>

  return (
    <>
      <PageHeader
        backIcon={false}
        title="View Credential"
        extra={[
          <Link key="edit" href={`/credentials/${data?.id}/edit`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>,
          <Link key="create" href="/credentials/new">
            <Button icon={<PlusSquareOutlined />}>Add Credential</Button>
          </Link>,
        ]}
      />

      <Form {...layout}>
        <Form.Item label="System Id">
          <Text>{data?.email}</Text>
        </Form.Item>

        <Form.Item label="Hotel Name">
          <Text>{data?.email}</Text>
        </Form.Item>

        <Form.Item label="Username">
          <Text>{data?.email}</Text>
        </Form.Item>

        <Form.Item label="Password">
          <Text mark>*********</Text>
        </Form.Item>
      </Form>
    </>
  )
}

export default CredentialsView
