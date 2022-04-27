import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {pushSingleMember} from "./api/entry"

export default function Home() {
  const userCheckin = (e) => {
    e.preventDefault();
    pushSingleMember(e.target.PID.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={userCheckin}>
          <label htmlFor="Panther ID">Panther ID</label>
          <input id="PID" type="text" autoComplete="off" required />
          <button type="submit">Submit</button>
          <button type="reset">Reset Form</button>
       </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
