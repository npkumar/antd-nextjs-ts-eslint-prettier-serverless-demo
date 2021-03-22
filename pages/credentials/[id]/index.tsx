import React from 'react';
import { useRouter } from 'next/router';
import { Button, Form, PageHeader, Skeleton } from 'antd';
import Text from 'antd/lib/typography/Text';
import Link from 'next/link';
import { EditOutlined } from '@ant-design/icons';
import DeleteCredentialButton from '../../../client/components/DeleteCredentialButton';
import Failure from '../../../client/components/Failure';
import CredentialStatus from '../../../client/components/CredentialStatus';
import { HOTEL_CREDENTIAL_STATUS } from '../../../client/types/credentials';
import { useCredential } from '../../../client/api/hotelCredentials';
import { getQueryValue } from '../../../client/util';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const CredentialsView: React.FC = () => {
  const router = useRouter();
  const { query } = router;

  const credentialId = getQueryValue(query.id);
  const { credential, isError, isLoading } = useCredential(credentialId);

  if (isError) return <Failure />;

  if (isLoading) return <Skeleton active title paragraph={{ rows: 8 }} />;

  return (
    <>
      <PageHeader
        backIcon={false}
        title="View Credential"
        extra={[
          <CredentialStatus key="status" status={credential.status} />,
          <Link key="edit" href={`/credentials/${credential.id}/edit`}>
            <Button icon={<EditOutlined />}>Edit</Button>
          </Link>,
          credential.status === HOTEL_CREDENTIAL_STATUS.ACTIVE && (
            <DeleteCredentialButton
              key="delete"
              id={credential?.id}
              hotelName={credential?.hotelName}
            />
          ),
        ]}
      />

      <Form {...layout}>
        <Form.Item label="Hotel Name">
          <Text>{credential.hotelName}</Text>
        </Form.Item>

        <Form.Item label="Hotel Id">
          <Text>{credential.hotelId}</Text>
        </Form.Item>

        <Form.Item label="System Id">
          <Text>{credential.systemId}</Text>
        </Form.Item>

        <Form.Item label="PMS User Id">
          <Text>{credential.pmsUserId}</Text>
        </Form.Item>

        <Form.Item label="PMS Password">
          <Text mark>*********</Text>
        </Form.Item>
      </Form>
    </>
  );
};

export default CredentialsView;
