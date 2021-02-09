import '../node_modules/antd/dist/antd.less'
import '../styles/globals.css'
import Link from 'next/link'

import Amplify from 'aws-amplify'
import config from '../src/aws-exports'
import Layout, { Content, Header } from 'antd/lib/layout/layout'
import { Menu } from 'antd'
Amplify.configure({
  ...config,
  ssr: true,
})

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Header>
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
          <Menu.Item>
            <Link href="/protected-client-route">
              <span>Protected client route</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
    </Layout>
  )
}

export default MyApp
