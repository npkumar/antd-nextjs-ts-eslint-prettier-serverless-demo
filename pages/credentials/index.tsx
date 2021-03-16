/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Row, List, PageHeader, Space, Col, Input, Pagination, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { EditOutlined, EyeOutlined, PlusSquareOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Failure from '../../components/Failure'
import omit from 'lodash/omit'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Index: React.FC = () => {
  const router = useRouter()
  const { query } = router

  const qPage = parseInt(
    Array.isArray(query.page)
      ? Number.isInteger(query.page[0])
        ? query.page[0]
        : '1'
      : query.page ?? '1',
    10
  )

  const qEmail = Array.isArray(query.email) ? query.email[0] : query.email

  const [current, setCurrent] = useState<number>(qPage)
  const [email, setEmail] = useState<string | undefined>()
  const [searchTerm, setSearchTerm] = useState<string | undefined>()

  const searchUrl = email
    ? `https://jsonplaceholder.typicode.com/comments?_start=${current - 1}&_limit=6&email=${email}`
    : `https://jsonplaceholder.typicode.com/comments?_start=${current - 1}&_limit=6`

  const { data, error } = useSWR(searchUrl, fetcher)

  useEffect(() => {
    setCurrent(qPage)
  }, [qPage])

  useEffect(() => {
    setEmail(qEmail)
    setSearchTerm(qEmail)
  }, [qEmail])

  if (error) return <Failure />
  // if (!data) return <div>Loading...</div>

  return (
    <div>
      <PageHeader backIcon={false} title="Credentials" subTitle="Credentials description" />
      <List
        header={
          <Row justify="end" gutter={8}>
            <Col>
              <Input.Search
                placeholder="Username"
                allowClear
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
                onSearch={(value) => {
                  setEmail(value)
                  // TODO: Set total pages from response
                  router.push({
                    pathname: '/credentials',
                    query: value
                      ? { ...query, email: value }
                      : { ...omit({ ...query }, ['email']) },
                  })
                }}
              />
            </Col>
            <Col>
              <Link href="/credentials/new">
                <Button icon={<PlusSquareOutlined />}>Add Credential</Button>
              </Link>
            </Col>
          </Row>
        }
        itemLayout="horizontal"
        dataSource={data || Array(6).fill(0)}
        renderItem={(item) => (
          <List.Item>
            <Skeleton title={false} loading={!data} active>
              {/* @ts-ignore */}
              <List.Item.Meta title={item.email} description={item.name} />
              <Space>
                {/* @ts-ignore */}
                <Link href={`/credentials/${item.id}`}>
                  <Button icon={<EyeOutlined />}>View</Button>
                </Link>
                {/* @ts-ignore */}
                <Link href={`/credentials/${item.id}/edit`}>
                  <Button icon={<EditOutlined />}>Edit</Button>
                </Link>
              </Space>
            </Skeleton>
          </List.Item>
        )}
      />
      <Row justify="center">
        <Col>
          <Pagination
            showTotal={(total) => `Total ${total}`}
            current={current}
            onChange={(page) => {
              // TODO: Better way to test this?
              // cache.clear()
              setCurrent(page)
              router.push({
                pathname: '/credentials',
                query: { ...query, page },
              })
            }}
            total={500}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Index
