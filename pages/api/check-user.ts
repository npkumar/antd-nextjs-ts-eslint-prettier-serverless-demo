import Amplify, { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import awsCongnitoConfig from '../../amplify/config';

Amplify.configure({ ...awsCongnitoConfig });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    res.json({ user });
  } catch (err) {
    res.statusCode = 403;
    res.json({ user: null });
  }
};
