import axios from 'axios';
import getConfig from '../../../server/config';
import { getAPIHandlerWithCongnitoAndCredential } from '../../../server/handler';
const { hotelCredentialsEndpoint: endpoint } = getConfig();

const axiosInstance = axios.create({ baseURL: endpoint });

export default getAPIHandlerWithCongnitoAndCredential()
  .get(async (req, res) => {
    const { data } = await axiosInstance.get('/', { params: req.query });
    res.json(data);
  })
  .post(async (req, res) => {
    const { data } = await axiosInstance.post('/', req.body);
    res.json(data);
  });
