import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import FormDemo from '../components/FormDemo'
import useSWR from 'swr'
import Person from '../components/Person'
import { Row, Col } from 'antd'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/people', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FormDemo />

        <Row>
          {data.map((p, i) => (
            <Col span={6} key={i}>
              <Person person={p} />
            </Col>
          ))}
        </Row>
      </main>
    </div>
  )
}
