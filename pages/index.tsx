import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import FormDemo from '../components/FormDemo'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FormDemo />
      </main>
    </div>
  )
}
