import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, PageHeader, Skeleton } from 'antd';
import useSWR from 'swr';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import DeleteCredentialButton from '../../../components/DeleteCredentialButton';
import Failure from '../../../components/Failure';
import axios from 'axios';
import CredentialStatus from '../../../components/CredentialStatus';
import { HOTEL_CREDENTIAL_STATUS } from '../../../types/credentials';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const CredentialsView: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const { data, error } = useSWR(
    `/api/hotelcredentials/${query.id}`,
    fetcher
  );

  if (error) return <Failure />;

  if (!data) return <Skeleton active title paragraph={{ rows: 8 }} />;

  return (
    <>
      <PageHeader
        backIcon={false}
        title="View Credential"
        extra={[
          <CredentialStatus key="status" status={data.status} />,
          <Link key="edit" href={`/credentials/${data.id}/edit`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>,
          data.status === HOTEL_CREDENTIAL_STATUS.ACTIVE && (
            <DeleteCredentialButton key="delete" id={data?.id} hotelName={data?.hotelName} />
          ),
        ]}
      />

      <Form {...layout}>
        <Form.Item label="Hotel Name">
          <Text>{data.hotelName}</Text>
        </Form.Item>

        <Form.Item label="System Id">
          <Text>{data.systemId}</Text>
        </Form.Item>

        <Form.Item label="PMS User Id">
          <Text>{data.pmsUserId}</Text>
        </Form.Item>

        <Form.Item label="PMS Password">
          <Text mark>*********</Text>
        </Form.Item>
      </Form>
    </>
  );
};

export default CredentialsView;
