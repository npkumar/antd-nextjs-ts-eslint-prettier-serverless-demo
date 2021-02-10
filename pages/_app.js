import '../node_modules/antd/dist/antd.less'
import '../styles/globals.css'
import Link from 'next/link'

import Amplify from 'aws-amplify'
import { Menu } from 'antd'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import React, { useEffect, useState } from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import Authentication from '../components/Authentication'

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-northeast-1_jhu6PLl8f',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '6sntbopqn3ajsrj6mcqloe2me2',
  },
  ssr: true,
})

const MyApp = ({ Component, pageProps }) => {
  const [authState, setAuthState] = useState(AuthState.SignedOut)
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <span>Profile</span>
            </Link>
          </Menu.Item>
          {authState === AuthState.SignedIn && user && (
            <Menu.Item>
              <AmplifySignOut />
            </Menu.Item>
          )}
        </Menu>
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  ) : (
    <Authentication />
  )
}

export default MyApp
