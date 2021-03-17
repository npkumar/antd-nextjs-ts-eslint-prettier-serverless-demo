import React from 'react';
import { PageHeader } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index: React.FC = () => {
  const { t } = useTranslation('dashboard');

  return (
    <PageHeader backIcon={false} title={t('header.title')} subTitle="Description for dashboard" />
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'dashboard'])),
  },
});

export default Index;
