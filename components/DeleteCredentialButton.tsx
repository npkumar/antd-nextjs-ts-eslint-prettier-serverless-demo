import { Modal, Button, notification } from 'antd'
import React from 'react'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

interface IndexProps {
  username?: string
}

const DeleteCredentialButton: React.FC<IndexProps> = ({ username }) => {
  const showPromiseConfirm = () => {
    confirm({
      title: 'Do you want to delete this credential?',
      icon: <ExclamationCircleOutlined />,
      content: `${username} will be deleted`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch((e) => {
          console.error(e)
          notification.error({
            message: 'Something went wrong!',
            description: `Could not delete ${username}`,
            placement: 'topRight',
          })
        })
      },
      onCancel() {
        return
      },
    })
  }

  return (
    <Button key="delete" danger icon={<DeleteOutlined />} onClick={showPromiseConfirm}>
      Delete
    </Button>
  )
}

export default DeleteCredentialButton
