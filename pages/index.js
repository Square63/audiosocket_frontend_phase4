import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Audiosocket</title>
        <meta name="description" content="Audiosocket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a rel="noreferrer" target="_blank" href="https://www.audiosocket.com/">Audiosocket!</a>
        </h1>
      </main>
    </div>
  )
}
