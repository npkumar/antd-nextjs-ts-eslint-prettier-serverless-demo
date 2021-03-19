import axios from 'axios';
import getAPIHandler from '../../../server/handler';

const endpoint = 'http://localhost:8080/api/v0.1/hotelcredentials';

export default getAPIHandler()
    .get(async (req, res) => {
        const result = await axios.get(endpoint, { params: req.query });
        res.json(result.data)
    })