import React from 'react'
import { PageHeader, Space } from 'antd'
import HotelCard from '../components/HotelCard'

const Index: React.FC = () => {
  return (
    <>
      <PageHeader backIcon={false} title="Dashboard" subTitle="Description for dashboard" />

      <Space direction="vertical" style={{ width: '100%' }}>
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </Space>
    </>
  )
}

export default Index
