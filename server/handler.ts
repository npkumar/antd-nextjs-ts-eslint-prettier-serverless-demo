import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';
import congnitoMiddleware from './middleware/cognitoMiddleware';
import credentialWithCognitoMiddleware from './middleware/credentialWithCognitoMiddleware';
import { NextApiRequestHotelCredentialWithCognito, NextApiRequestWithCongito } from './types';

const nextConnectConfig = {
  onError(error, req, res) {
    res.status(500).json({ error: `Something happened, ${error.message}` });
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

export const getAPIHandlerCredentialWithCongnito = () =>
  nextConnect<NextApiRequestHotelCredentialWithCognito, NextApiResponse>(nextConnectConfig).use(
    credentialWithCognitoMiddleware
  );

export default getAPIHandler;
