import { Result } from 'antd'
import React from 'react'
import GoBackHomeButton from './GoBackHomeButton'

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you requested does not exist."
    extra={<GoBackHomeButton />}
  />
)

export default NotFound
