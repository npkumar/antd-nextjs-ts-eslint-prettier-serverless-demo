import axios from 'axios';
import getConfig from '../../../server/config';
import { getAPIHandlerCredentialWithCongnito } from '../../../server/handler';
const { hotelCredentialsEndpoint: endpoint } = getConfig();

export default getAPIHandlerCredentialWithCongnito()
  .get(async (req, res) => {
    const result = await axios.get(`${endpoint}/${req.credentialId}`, { params: req.query });
    res.json(result.data);
  })
  .put(async (req, res) => {
    const result = await axios.put(`${endpoint}/${req.credentialId}`, req.body);
    res.json(result.data);
  })
  .delete(async (req, res) => {
    const result = await axios.delete(`${endpoint}/${req.credentialId}`);
    res.json(result.data);
  });
