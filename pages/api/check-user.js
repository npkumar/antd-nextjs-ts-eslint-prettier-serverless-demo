import Amplify, { withSSRContext } from 'aws-amplify'

// Amplify SSR configuration needs to be enabled within each API route
Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-northeast-1_0NCoHSIU4',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '2hb06d27ehja2v463qcl9km9e',
  },
  ssr: true,
})

export default async (req, res) => {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    res.json({ user })
  } catch (err) {
    res.statusCode = 200
    res.json({ user: null })
  }
}
