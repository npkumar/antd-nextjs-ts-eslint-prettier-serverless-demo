import { Tag } from 'antd';
import { HOTEL_CREDENTIAL_STATUS } from '../types/credentials';

interface IndexProps {
  status: HOTEL_CREDENTIAL_STATUS;
}

const CredentialStatus: React.FC<IndexProps> = ({ status }) => (
  <Tag color={status === HOTEL_CREDENTIAL_STATUS.ACTIVE ? 'green' : 'volcano'}>{status}</Tag>
);

export default CredentialStatus;
