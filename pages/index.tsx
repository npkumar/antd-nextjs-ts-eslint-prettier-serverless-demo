import React from 'react'
import { PageHeader } from 'antd'
import HotelCard from '../components/HotelCard'

const Index: React.FC = () => {
  return (
    <>
      <PageHeader backIcon={false} title="Dashboard" subTitle="Description for dashboard" />
      <HotelCard />
    </>
  )
}

export default Index
