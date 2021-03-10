import '../node_modules/antd/dist/antd.less'
import '../styles/globals.css'
import Link from 'next/link'
import Amplify, { Auth } from 'aws-amplify'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import React, { useState } from 'react'
import Authentication from '../components/Authentication'
import LanguageDropdown from '../components/LanguageDropdown'
import dictionary from '../dictionary'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Button, Layout, Menu, Row, Col } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LineChartOutlined,
  RiseOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { appWithTranslation } from 'next-i18next'

const { Header, Sider, Content } = Layout

Amplify.I18n.putVocabulariesForLanguage('ja', dictionary)

import config from '../src/aws-exports'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
Amplify.configure({
  ...config,
  ssr: true,
})

const MyApp = ({ Component, pageProps }) => {
  const [authState, setAuthState] = useState(AuthState.SignedOut)
  const [user, setUser] = useState(null)
  const [collapsed, setCollapsed] = useState(false)

  const router = useRouter()
  const { locale, pathname } = router
  Amplify.I18n.setLanguage(locale === 'ja' ? 'ja' : 'en')

  useIsomorphicLayoutEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <>
      <Head>
        <title>Kakaku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link href="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="/credentials" icon={<LockOutlined />}>
              <Link href="/credentials">Credentials</Link>
            </Menu.Item>
            <Menu.Item key="/stats" icon={<LineChartOutlined />}>
              <Link href="/stats">Stats</Link>
            </Menu.Item>
            <Menu.Item key="/revenue" icon={<RiseOutlined />}>
              <Link href="/revenue">Revenue</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Header
            className="site-layout-background"
            style={{
              position: 'fixed',
              zIndex: 1,
              width: collapsed ? `calc(100% - 80px)` : `calc(100% - 200px)`,
              padding: 0,
            }}
          >
            <Row justify="space-between">
              <Col span={12}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
                KAKAKU
              </Col>
              <Col span={12}>
                <Row justify="end" gutter={8}>
                  <Col>
                    <LanguageDropdown />
                  </Col>
                  <Col style={{ marginRight: '16px' }}>
                    <Button type="primary" onClick={() => Auth.signOut()} icon={<LogoutOutlined />}>
                      Logout
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '80px 16px 24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </>
  ) : (
    <Authentication />
  )
}

export default appWithTranslation(MyApp)
