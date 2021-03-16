import { Button } from 'antd'
import Link from 'next/link'

const GoBackHomeButton: React.FC = () => (
  <Link href="/">
    <Button>Go back to Kakaku</Button>
  </Link>
)

export default GoBackHomeButton
