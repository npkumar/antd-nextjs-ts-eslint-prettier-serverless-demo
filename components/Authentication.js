import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'

const Authentication = () => {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: 'email',
            label: 'Custom email Label',
            placeholder: 'custom email placeholder',
            required: true,
          },
          {
            type: 'password',
            label: 'Custom Password Label',
            placeholder: 'custom password placeholder',
            required: true,
          },
          {
            type: 'phone_number',
            label: 'Custom Phone Label',
            placeholder: 'custom Phone placeholder',
            required: false,
          },
        ]}
      />
      <AmplifySignIn
        slot="sign-in"
        usernameAlias="email"
        formFields={[
          {
            type: 'email',
            label: 'Custom email Label',
            placeholder: 'custom email placeholder',
            required: true,
          },
          {
            type: 'password',
            label: 'Custom Password Label',
            placeholder: 'custom password placeholder',
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default Authentication
