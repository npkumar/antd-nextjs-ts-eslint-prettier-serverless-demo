import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'

const Authentication: React.FC = () => (
  <AmplifyAuthenticator usernameAlias="email">
    <AmplifySignUp
      slot="sign-up"
      usernameAlias="email"
      formFields={[
        {
          type: 'email',
          required: true,
        },
        {
          type: 'password',
          required: true,
        },
      ]}
    />
    <AmplifySignIn slot="sign-in" usernameAlias="email" />
  </AmplifyAuthenticator>
)

export default Authentication
