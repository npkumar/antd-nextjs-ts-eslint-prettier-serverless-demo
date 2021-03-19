import { NextApiRequest } from 'next';

export interface NextApiRequestWithCongito extends NextApiRequest {
  email: number | null;
  group: string | null;
}

export interface NextApiRequestHotelCredentialWithCognito extends NextApiRequestWithCongito {
  credentialId: string | null;
}
