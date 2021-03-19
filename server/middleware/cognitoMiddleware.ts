import { NextApiResponse } from 'next';
import { NextApiRequestWithCongito } from './../types';

const congnitoMiddleware = (req: NextApiRequestWithCongito, res: NextApiResponse, next) => {
  req.email = null;
  req.group = null;

  //TODO: Implement auth
  // @see https://docs.amplify.aws/lib/ssr/q/platform/js
  // @see https://github.com/aws-amplify/amplify-js/pull/6146
  next();
};

export default congnitoMiddleware;
