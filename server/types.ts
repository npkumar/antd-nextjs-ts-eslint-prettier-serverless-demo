import { NextApiRequest } from 'next';

export interface NextApiRequestWithCongito extends NextApiRequest {
  email: number | null;
  group: string | null;
}

export interface NextApiRequestHotelWithCognitoAndCredential extends NextApiRequestWithCongito {
  credentialId: string | null;
}
