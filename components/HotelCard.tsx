import { Button, Card, Col, Drawer, Row, Space, Tag } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { useState } from 'react'

const HotelCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <Drawer
        width="640"
        title="Drawer Title"
        placement="right"
        closable
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        key="right"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Card>
        <Row>
          <Col xs={6}>
            <Space direction="vertical">
              <Title level={4}>Card Title</Title>
              <Tag>Tag 1</Tag>
              <Tag>Tag 2</Tag>
              <Tag>Tag 3</Tag>
            </Space>
          </Col>
          <Col xs={6}>
            <Button onClick={() => setIsVisible(true)}>More</Button>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default HotelCard
