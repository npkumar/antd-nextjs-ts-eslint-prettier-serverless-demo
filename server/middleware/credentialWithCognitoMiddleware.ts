import { NextApiResponse } from 'next';
import { NextApiRequestHotelCredentialWithCognito } from '../types';

const credentialWithCognitoMiddleware = (
  req: NextApiRequestHotelCredentialWithCognito,
  res: NextApiResponse,
  next
) => {
  req.credentialId = Array.isArray(req.query?.id) ? req.query?.id[0] : req.query?.id ?? null;

  next();
};

export default credentialWithCognitoMiddleware;
