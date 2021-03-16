import { Result } from 'antd';
import GoBackHomeButton from '../components/GoBackHomeButton';

const Custom404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<GoBackHomeButton />}
  />
);

export default Custom404;
