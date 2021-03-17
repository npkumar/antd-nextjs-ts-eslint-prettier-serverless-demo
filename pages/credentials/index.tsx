import { Button, Row, List, PageHeader, Space, Col, Input, Pagination, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { EditOutlined, EyeOutlined, PlusSquareOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Failure from '../../components/Failure';
import omit from 'lodash/omit';
import axios from 'axios';

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

  let searchUrl = `https://jsonplaceholder.typicode.com/comments?_start=${current - 1}&_limit=6`;
  if (search) {
    searchUrl += `&email=${search}`;
  }

  const { data, error } = useSWR(searchUrl, fetcher);

  useEffect(() => setCurrent(qPage), [qPage]);
  useEffect(() => {
    setSearch(qSearch);
    setSearchTerm(qSearch);
  }, [qSearch]);

  if (error) return <Failure />;

  return (
    <>
      <PageHeader backIcon={false} title="Credentials" subTitle="Credentials description" />
      <List
        header={
          <Row justify="end" gutter={8}>
            <Col>
              <Input.Search
                placeholder="Username"
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={(value) => {
                  setSearch(value);
                  // TODO: Set total pages from response
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
        // Shows a skeleton of 6 list items if data is being loaded
        dataSource={data || Array(6).fill(0)}
        renderItem={(item) => (
          <List.Item>
            <Skeleton title={false} loading={!data} active>
              {/* @ts-ignore */}
              <List.Item.Meta title={item.email} description={item.name} />
              <Space>
                {/* @ts-ignore */}
                <Link href={`/credentials/${item.id}`}>
                  <Button icon={<EyeOutlined />}>View</Button>
                </Link>
                {/* @ts-ignore */}
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
            showTotal={(total) => `Total ${total}`}
            current={current}
            onChange={(page) => {
              setCurrent(page);
              router.push({
                pathname: '/credentials',
                query: { ...query, page },
              });
            }}
            // TODO: Set total pages from response
            total={500}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Index;
