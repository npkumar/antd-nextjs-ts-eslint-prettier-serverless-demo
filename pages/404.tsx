import { Button, Result } from 'antd'
import Link from 'next/link'

const Custom404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link href="/">
        <Button type="primary">Go back to Kakaku</Button>
      </Link>
    }
  />
)

export default Custom404
