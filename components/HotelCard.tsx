import { Button, Card, Col, Drawer, Row, Space, Tag } from 'antd'
import { Column } from '@ant-design/charts'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'

const today = dayjs()
const oneMonthFromNow = today.add(1, 'month')
const data = []
for (let day = today; day.isBefore(oneMonthFromNow); day = day.add(1, 'day')) {
  data.push({
    date: day.format('YYYY-MM-DD'),
    price: 800 + Math.random() * 200,
  })
}

const config = {
  data: data,
  xField: 'date',
  yField: 'price',
  label: {
    content: () => '',
  },
  columnStyle: {
    cursor: 'pointer',
  },
}

const HotelCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const [date, setDate] = useState()
  const [price, setPrice] = useState()

  useEffect(() => {
    if (ref.current) {
      // click point
      ref.current.on('element:click', ({ data }) => {
        const { date, price } = data.data
        setDate(date)
        setPrice(price)
        setIsVisible(true)
      })
    }
  }, [])

  return (
    <div>
      <Drawer
        width="640"
        title={date}
        placement="right"
        closable
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        key="right"
      >
        <h1>Price: {Number.parseFloat(price).toFixed(2)}</h1>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Card>
        <Row>
          <Col xs={4}>
            <Space direction="vertical">
              <Title level={4}>Card Title</Title>
              <Tag>Tag 1</Tag>
              <Tag>Long Tag 2</Tag>
              <Tag>Another Tag 3</Tag>
              <Button onClick={() => setIsVisible(true)}>More</Button>
            </Space>
          </Col>
          <Col xs={20} style={{ height: 300 }}>
            <Column {...config} chartRef={ref} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default HotelCard
