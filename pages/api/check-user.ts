import { withSSRContext } from '../../amplify';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // @see https://docs.amplify.aws/lib/ssr/q/platform/js
  // @see https://github.com/aws-amplify/amplify-js/pull/6146
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    res.json({ user });
  } catch (err) {
    res.statusCode = 403;
    res.json({ user: null });
  }
};
