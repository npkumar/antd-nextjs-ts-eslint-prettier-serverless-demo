import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

export interface NextApiRequestExtended extends NextApiRequest {
  email: number | null;
  group: string | null;
  credentialId: string | null;
};

const getAPIHandler = () => {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
    onError(error, req, res) {
      res.status(500).json({ error: `Something happened, ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
  }).use((req, res, next) => {
    req.email = null;
    req.group = null;
    req.credentialId = Array.isArray(req.query?.id) ? req.query?.id[0] : req.query?.id ?? null;
    next();
  });
};

export default getAPIHandler;
