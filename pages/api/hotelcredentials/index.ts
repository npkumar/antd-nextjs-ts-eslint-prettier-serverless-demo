import axios from 'axios';
import { getAPIHandlerWithCongnito } from '../../../server/handler';

const endpoint = 'http://localhost:8080/api/v0.1/hotelcredentials';

export default getAPIHandlerWithCongnito()
  .get(async (req, res) => {
    const result = await axios.get(endpoint, { params: req.query });
    res.json(result.data);
  })
  .post(async (req, res) => {
    const result = await axios.post(endpoint, req.body);
    res.json(result.data);
  });
