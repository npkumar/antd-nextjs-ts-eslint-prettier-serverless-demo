import React from 'react'
import { PageHeader, Space } from 'antd'
import HotelCard from '../components/HotelCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Index: React.FC = () => {
  const { t } = useTranslation('dashboard')

  return (
    <>
      <PageHeader backIcon={false} title={t('header.title')} subTitle="Description for dashboard" />

      <Space direction="vertical" style={{ width: '100%' }}>
        <HotelCard />
        <HotelCard />
        <HotelCard />
      </Space>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
  },
})

export default Index
