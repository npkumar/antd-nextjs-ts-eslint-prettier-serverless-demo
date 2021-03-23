import { NextApiRequest } from 'next';

export interface NextApiRequestWithCongito extends NextApiRequest {
  email: number | null;
  groups: string[];
}

export interface NextApiRequestWithCredential extends NextApiRequest {
  credentialId: string | null;
}

export interface NextApiRequestWithCognitoAndCredential
  extends NextApiRequestWithCongito,
    NextApiRequestWithCredential {}
