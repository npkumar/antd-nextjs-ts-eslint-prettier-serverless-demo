/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Row, List, PageHeader, Space, Col, Input, Pagination, Skeleton } from 'antd'
import React, { useState } from 'react'
import useSWR, { cache } from 'swr'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusSquareOutlined } from '@ant-design/icons'

// @see https://stackoverflow.com/questions/64199630/problem-with-typescript-while-making-request-to-swr
const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init)
  return res.json()
}

const Credentials: React.FC = () => {
  const [current, setCurrent] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(500)

  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/comments?_start=${current - 1}&_limit=6`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
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
                onSearch={(value) => console.log(value)}
              />
            </Col>
            <Col>
              <Button icon={<PlusSquareOutlined />}>Add Credential</Button>
            </Col>
          </Row>
        }
        itemLayout="horizontal"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page)
        //   },
        //   pageSize: 6,
        // }}
        dataSource={data || Array(6).fill(0)}
        renderItem={(item) => (
          <List.Item>
            <Skeleton title={false} loading={!data} active>
              {/* @ts-ignore */}
              <List.Item.Meta title={item.email} description={item.name} />
              <Space>
                <Button icon={<EyeOutlined />}>View</Button>
                <Button icon={<EditOutlined />}>Edit</Button>
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
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
              // cache.clear()
              setCurrent(page)
            }}
            total={totalPages}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Credentials
