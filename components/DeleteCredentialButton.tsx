import { Modal, Button, notification } from 'antd'
import React from 'react'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { mutate, cache } from 'swr'
const { confirm } = Modal
interface IndexProps {
  id: string
  username: string
}

const invalidateCredentialsCache = () => {
  cache
    .keys()
    .filter((key) => key.includes('comments'))
    .forEach((key) => mutate(key))
}

const DeleteCredentialButton: React.FC<IndexProps> = ({ id, username }) => {
  const router = useRouter()
  const showPromiseConfirm = () => {
    confirm({
      title: 'Do you want to delete this credential?',
      icon: <ExclamationCircleOutlined />,
      content: `${username} will be deleted`,
      onOk() {
        return fetch('https://jsonplaceholder.typicode.com/comments/1', {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          //make sure to serialize your JSON body
          body: JSON.stringify({
            id: id,
            username: username,
          }),
        })
          .then(() => {
            // TODO: Revalidate cache and take back to last screen?
            invalidateCredentialsCache()
            router.push('/credentials')
            notification.info({
              message: 'Successful!',
              description: `Deleted credential ${username}`,
              placement: 'topRight',
            })
          })
          .catch((e) => {
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
