import React from 'react'
import { Button, Result } from 'antd'
import Link from 'next/link'

const Failure: React.FC = () => {
  return (
    <Result
      title="Sorry"
      subTitle="Something went wrong."
      extra={
        <Link href="/">
          <Button>Go back to Kakaku</Button>
        </Link>
      }
    />
  )
}

export default Failure
