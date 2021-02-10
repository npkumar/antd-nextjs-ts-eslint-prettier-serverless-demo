import '../node_modules/antd/dist/antd.less'
import '../styles/globals.css'
import Link from 'next/link'

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import { Menu } from 'antd'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import React, { useEffect, useState } from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'

Amplify.configure({
  ...config,
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

  return (
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
  )
}

export default MyApp
