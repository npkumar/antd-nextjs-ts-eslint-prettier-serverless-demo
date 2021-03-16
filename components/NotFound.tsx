import { Button, Result } from 'antd'
import Link from 'next/link'
import React from 'react'

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you requested does not exist."
      extra={
        <Link href="/">
          <Button type="primary">Go back to Kakaku</Button>
        </Link>
      }
    />
  )
}

export default NotFound
