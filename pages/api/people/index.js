import Amplify, { withSSRContext } from 'aws-amplify'
import { people } from '../../../data'

import config from '../../../src/aws-exports'
Amplify.configure({
  ...config,
  ssr: true,
})

export default async function handler(req, res) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    res.json({ people })
  } catch (err) {
    res.statusCode = 401
    res.json({ error: err })
  }
}
