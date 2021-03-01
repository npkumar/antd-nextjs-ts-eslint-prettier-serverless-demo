import { Card, Col, Row, Space, Tag } from 'antd'
import Title from 'antd/lib/typography/Title'
import BarChart from './BarChart'
import React from 'react'

const HotelCard: React.FC = () => {
  return (
    <Card>
      <Row>
        <Col xs={6}>
          <Space direction="vertical">
            <Title level={4}>Card Title</Title>
            <Tag>Tag 1</Tag>
            <Tag>Long Tag 2</Tag>
            <Tag>Another Tag 3</Tag>
          </Space>
        </Col>
        <Col xs={18} style={{ height: 250 }}>
          <BarChart />
        </Col>
      </Row>
    </Card>
  )
}

export default HotelCard
