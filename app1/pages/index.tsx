import * as React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: [] }) {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="/" className={styles.card} rel="noopener noreferrer">
            <h2 className={inter.className}>
              <span>&lt;-</span> Portal
            </h2>
            <p className={inter.className}>Back to Portal</p>
          </a>
          <div className={styles.description}>
            <h1>Future DX</h1>
            <br />
            <br />
            <h2>Count: {count}</h2>
            <button
              className={styles.button}
              onClick={() => setCount(prev => prev + 1)}
            >
              INCREMENT
            </button>
            <h2>Names</h2>
            <br />
            <ul>
              {data.map(item => {
                return (
                  <li key={item.depositTransferId}>
                    {item.payeeId} - {item.payeeName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const url =
    "https://dev-api.ac1.conservice.com/conservice-portal/payment-control-center/secured/api/v1/ach-transfers/in-progress?status=READY_TO_PAY";
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  });

  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
