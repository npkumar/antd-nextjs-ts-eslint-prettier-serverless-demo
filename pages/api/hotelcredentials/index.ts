import axios from 'axios';
import getConfig from '../../../server/config';
import { getAPIHandlerWithCongnito } from '../../../server/handler';
const { hotelCredentialsEndpoint: endpoint } = getConfig();

export default getAPIHandlerWithCongnito()
  .get(async (req, res) => {
    const result = await axios.get(endpoint, { params: req.query });
    res.json(result.data);
  })
  .post(async (req, res) => {
    const result = await axios.post(endpoint, req.body);
    res.json(result.data);
  });
