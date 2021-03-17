import Link from 'next/link';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Authentication from '../components/Authentication';
import LanguageDropdown from '../components/LanguageDropdown';
import { useRouter } from 'next/router';
import Head from 'next/head';
import classNames from 'classnames';
import { Button, Layout, Menu, Row, Col, ConfigProvider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LineChartOutlined,
  RiseOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { appWithTranslation } from 'next-i18next';
import jaJP from 'antd/lib/locale/ja_JP';
import enGB from 'antd/lib/locale/en_GB';
import Amplify, { Auth } from '../amplify';
import styles from './App.module.scss';

const { Header, Sider, Content } = Layout;

const MyApp = ({ Component, pageProps }) => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignedOut);
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  const { locale, pathname } = router;

  // @see https://docs.amplify.aws/ui/auth/authenticator/q/framework/react
  useLayoutEffect(() => {
    return onAuthUIStateChange((nextAuthState) => {
      setAuthState(nextAuthState);
    });
  }, []);

  useEffect(() => {
    Amplify.I18n.setLanguage(locale === 'ja' ? 'ja' : 'en');
  }, [locale]);

  return authState === AuthState.SignedIn ? (
    <ConfigProvider locale={locale === 'ja' ? jaJP : enGB}>
      <Head>
        <title>Kakaku</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sider
        breakpoint="lg"
        className={styles.sider}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className={styles.logo} />
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

      <Layout
        className={classNames(styles.layout, {
          [styles['layout--collapsed']]: collapsed,
        })}
      >
        <Header
          className={classNames(styles.header, {
            [styles['header--collapsed']]: collapsed,
          })}
        >
          <Row justify="space-between">
            <Col span={12}>
              {/* Sider toggle icon */}
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles.trigger,
                onClick: () => setCollapsed(!collapsed),
              })}
              KAKAKU
            </Col>
            <Col span={12}>
              <Row justify="end" gutter={8}>
                <Col>
                  <LanguageDropdown />
                </Col>
                <Col>
                  <Button type="primary" onClick={() => Auth.signOut()} icon={<LogoutOutlined />}>
                    Logout
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ConfigProvider>
  ) : (
    <Authentication />
  );
};

export default appWithTranslation(MyApp);
