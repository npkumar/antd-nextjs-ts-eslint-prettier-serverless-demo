import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import en from '../locales/en'
import ja from '../locales/ja'

const Authentication = () => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'ja' ? ja : en

  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: 'email',
            label: t.authentication.emailLabel,
            placeholder: t.authentication.emailLabel,
            required: true,
          },
          {
            type: 'password',
            label: t.authentication.passwordLabel,
            placeholder: t.authentication.passwordLabel,
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
            label: t.authentication.emailLabel,
            placeholder: t.authentication.emailLabel,
            required: true,
          },
          {
            type: 'password',
            label: t.authentication.passwordLabel,
            placeholder: t.authentication.passwordLabel,
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
  )
}

export default Authentication
