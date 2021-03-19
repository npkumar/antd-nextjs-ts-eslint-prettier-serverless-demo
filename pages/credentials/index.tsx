import { Button, Row, List, PageHeader, Space, Col, Input, Pagination, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { EditOutlined, EyeOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Failure from '../../client/components/Failure';
import omit from 'lodash/omit';
import axios from 'axios';
import { HOTEL_CREDENTIALS } from '../../client/types/credentials';
import CredentialStatus from '../../client/components/CredentialStatus';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const getQueryValue = (value): string | undefined => (Array.isArray(value) ? value[0] : value);

const Index: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const qPage = parseInt(getQueryValue(query.page) ? query.page[0] : '1', 10);
  const qSearch = getQueryValue(query.search);

  const [current, setCurrent] = useState<number>(qPage);
  const [search, setSearch] = useState<string | undefined>(qSearch);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [totalPages, setTotalPages] = useState<number>(1);

  const pageSize = 6;
  let searchUrl = `/api/hotelcredentials?page=${current - 1}&size=${pageSize}`;
  if (search) {
    searchUrl += `&hotelName=${search}`;
  }

  const { data, error } = useSWR(searchUrl, fetcher);

  useEffect(() => setCurrent(qPage), [qPage]);

  useEffect(() => {
    setSearch(qSearch);
    setSearchTerm(qSearch);
  }, [qSearch]);

  useEffect(() => {
    setTotalPages(isNaN(data?.totalPages) ? 1 : data?.totalPages * pageSize);
  }, [data?.totalPages]);

  if (error) return <Failure />;

  const content: HOTEL_CREDENTIALS[] | undefined = data?.content;

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
        dataSource={content || Array(pageSize).fill(0)}
        renderItem={(item) => (
          <List.Item>
            <Skeleton title={false} loading={!data} active>
              <List.Item.Meta title={item.hotelName} description={item.pmsUserId} />
              <Space>
                <CredentialStatus status={item.status} />
                <Link href={`/credentials/${item.id}`}>
                  <Button icon={<EyeOutlined />}>View</Button>
                </Link>
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
            current={current}
            onChange={(page) => {
              setCurrent(page);
              router.push({
                pathname: '/credentials',
                query: { ...query, page },
              });
            }}
            total={totalPages}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Index;
