import { NextApiRequestWithCredential } from '../types';
import { NextApiResponse } from 'next';

const credentialMiddleware = (req: NextApiRequestWithCredential, res: NextApiResponse, next) => {
  req.credentialId = Array.isArray(req.query?.id) ? req.query?.id[0] : req.query?.id ?? null;

  next();
};

export default credentialMiddleware;
