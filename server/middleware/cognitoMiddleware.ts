import { NextApiResponse } from 'next';
import { NextApiRequestWithCongito } from './../types';
import { withSSRContext } from '../../amplify';
import UnauthenticatedError from '../errors/Unauthenticated';

const congnitoMiddleware = async (req: NextApiRequestWithCongito, res: NextApiResponse, next) => {
  req.email = null;
  req.groups = [];

  // @see https://docs.amplify.aws/lib/ssr/q/platform/js
  // @see https://github.com/aws-amplify/amplify-js/pull/6146
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { email, ['cognito:groups']: groups } = user.signInUserSession.idToken.payload;
    req.email = email;
    req.groups = groups; // e.g. [ 'Admin' ]
    next();
  } catch (err) {
    throw new UnauthenticatedError('You are not authenticated');
  }
};

export default congnitoMiddleware;
