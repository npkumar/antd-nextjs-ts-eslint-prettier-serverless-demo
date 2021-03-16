import React from 'react'
import { Result } from 'antd'
import GoBackHomeButton from './GoBackHomeButton'

const Failure: React.FC = () => {
  return <Result title="Sorry" subTitle="Something went wrong." extra={<GoBackHomeButton />} />
}

export default Failure
