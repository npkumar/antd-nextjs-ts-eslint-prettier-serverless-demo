import { Button, Row, List, PageHeader, Space, Col, Input, Pagination, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { EditOutlined, EyeOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Failure from '../../client/components/Failure';
import omit from 'lodash/omit';
import { HOTEL_CREDENTIAL } from '../../client/types/credentials';
import CredentialStatus from '../../client/components/CredentialStatus';
import { useCredentials } from '../../client/api/hotelCredentials';
import { getQueryValue } from '../../client/util';

const Index: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const qPage = parseInt(getQueryValue(query.page) ? query.page[0] : '1', 10);
  const qSearch = getQueryValue(query.search);

  const [current, setCurrent] = useState<number>(qPage);
  const [search, setSearch] = useState<string | undefined>(qSearch);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [maxItems, setMaxItems] = useState<number>(0);

  const { credentials, isLoading, isError, totalPages, pageSize } = useCredentials({
    page: current,
    hotelName: search,
  });

  if (isError) return <Failure />;

  useEffect(() => setCurrent(qPage), [qPage]);

  useEffect(() => {
    setSearch(qSearch);
    setSearchTerm(qSearch);
  }, [qSearch]);

  useEffect(() => {
    setMaxItems(isNaN(totalPages) ? 1 : totalPages * (pageSize + 1));
  }, [totalPages]);

  return (
    <>
      <PageHeader backIcon={false} title="Credentials" subTitle="Credentials description" />
      <List
        header={
          <Row justify="end" gutter={8}>
            <Col>
              <Input.Search
                placeholder="Hotel Name"
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={(value) => {
                  setSearch(value);
                  router.push({
                    pathname: '/credentials',
                    query: value
                      ? { ...query, search: value }
                      : { ...omit({ ...query }, ['search']) },
                  });
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
        // Shows a skeleton of pageSize list items if data is being loaded
        dataSource={isLoading ? Array(pageSize).fill(0) : credentials}
        renderItem={(item: HOTEL_CREDENTIAL) => (
          <List.Item>
            <Skeleton title={false} loading={isLoading} active>
              <List.Item.Meta title={item.hotelName} description={item.pmsUserId} />
              <Space>
                <CredentialStatus status={item.status} />
                <Link href={`/credentials/${item.id}`}>
                  <Button size="small" icon={<EyeOutlined />}>
                    View
                  </Button>
                </Link>
                <Link href={`/credentials/${item.id}/edit`}>
                  <Button size="small" icon={<EditOutlined />}>
                    Edit
                  </Button>
                </Link>
              </Space>
            </Skeleton>
          </List.Item>
        )}
      />
      <Row justify="center">
        <Col>
          <Pagination
            current={current}
            onChange={(page) => {
              setCurrent(page);
              router.push({
                pathname: '/credentials',
                query: { ...query, page },
              });
            }}
            total={maxItems}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Index;
