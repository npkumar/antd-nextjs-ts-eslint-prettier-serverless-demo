import axios from 'axios';
import getConfig from '../../../server/config';
import { getAPIHandlerWithCongnitoAndCredential } from '../../../server/handler';
const { hotelCredentialsEndpoint: endpoint } = getConfig();

const axiosInstance = axios.create({ baseURL: endpoint });

export default getAPIHandlerWithCongnitoAndCredential()
  .get(async (req, res) => {
    const result = await axiosInstance.get(`/${req.credentialId}`, {
      params: req.query,
    });
    res.json(result.data);
  })
  .put(async (req, res) => {
    const result = await axiosInstance.put(`/${req.credentialId}`, req.body);
    res.json(result.data);
  })
  .delete(async (req, res) => {
    const result = await axiosInstance.delete(`/${req.credentialId}`);
    res.json(result.data);
  });
