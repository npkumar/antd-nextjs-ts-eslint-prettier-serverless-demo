import { ERROR_TYPES } from './errors/types';
import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';
import congnitoMiddleware from './middleware/cognitoMiddleware';
import credentialMiddleware from './middleware/credentialMiddleware';
import { NextApiRequestWithCognitoAndCredential, NextApiRequestWithCongito } from './types';

const nextConnectConfig = {
  onError(error, req, res) {
    switch (error.name) {
      // TODO: Handle gracefully on client, right now shows a generic Failure component
      case ERROR_TYPES.UNAUTHORIZED:
        return res.status(401).json({ status: error.message });
      case ERROR_TYPES.UNAUTHENTICATED:
        return res.status(403).json({ status: error.message });
      default:
        return res.status(500).json({ status: `Something happened, ${error.message}` });
    }
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
};

const getAPIHandler = () => nextConnect<NextApiRequest, NextApiResponse>(nextConnectConfig);

export const getAPIHandlerWithCongnito = () =>
  nextConnect<NextApiRequestWithCongito, NextApiResponse>(nextConnectConfig).use(
    congnitoMiddleware
  );

export const getAPIHandlerWithCongnitoAndCredential = () =>
  nextConnect<NextApiRequestWithCognitoAndCredential, NextApiResponse>(nextConnectConfig)
    .use(congnitoMiddleware)
    .use(credentialMiddleware);

export default getAPIHandler;
