import axios from 'axios';
import getConfig from '../../../server/config';
import { getAPIHandlerWithCongnitoAndCredential } from '../../../server/handler';
const { hotelCredentialsEndpoint: endpoint } = getConfig();

const axiosInstance = axios.create({ baseURL: endpoint });

export default getAPIHandlerWithCongnitoAndCredential()
  .get(async (req, res) => {
    const result = await axiosInstance.get('/', { params: req.query });
    res.json(result.data);
  })
  .post(async (req, res) => {
    const result = await axiosInstance.post('/', req.body);
    res.json(result.data);
  });
