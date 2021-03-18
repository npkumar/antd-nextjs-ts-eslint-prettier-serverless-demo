import { Modal, Button, notification } from 'antd';
import React from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { mutate, cache } from 'swr';
import axios from 'axios';
const { confirm } = Modal;
interface IndexProps {
  id: string;
  hotelName: string;
}

const invalidateCredentialsCache = () => {
  cache
    .keys()
    .filter((key) => key.includes('credentials'))
    .forEach((key) => mutate(key));
};

const DeleteCredentialButton: React.FC<IndexProps> = ({ id, hotelName }) => {
  const router = useRouter();
  const showPromiseConfirm = () => {
    confirm({
      title: 'Do you want to delete this credential?',
      icon: <ExclamationCircleOutlined />,
      content: `${hotelName} will be deleted`,
      cancelText: 'Cancel',
      okText: 'Confirm',
      onOk() {
        axios
          .delete(`http://localhost:8080/api/v0.1/hotelcredentials/${id}`)
          .then(() => {
            // TODO: Revalidate cache
            invalidateCredentialsCache();
            // Redirect to view page, status should be inactive now
            router.push(`/credentials/${id}`);
            notification.info({
              message: 'Successful!',
              description: `Deleted credential ${hotelName}`,
              placement: 'topRight',
            });
          })
          .catch(() => {
            notification.error({
              message: 'Something went wrong!',
              description: `Could not delete ${hotelName}`,
              placement: 'topRight',
            });
          });
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <Button key="delete" danger icon={<DeleteOutlined />} onClick={showPromiseConfirm}>
      Delete
    </Button>
  );
};

export default DeleteCredentialButton;
