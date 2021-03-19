import { NextApiResponse } from 'next';
import { NextApiRequestWithCongito } from './../types';

const congnitoMiddleware = (req: NextApiRequestWithCongito, res: NextApiResponse, next) => {
  req.email = null;
  req.group = null;
  next();
};

export default congnitoMiddleware;
