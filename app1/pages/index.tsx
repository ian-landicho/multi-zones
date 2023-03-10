import * as React from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

type Payee = {
  depositTransferId: number;
  paymentCountry: string;
  amount: number;
  payeeId: string;
  payeeName: string;
  payeeType: string;
  numberOfBills: 14;
  urgency: string;
  depositTransferType: string;
  depositTransferState: string;
  paymentProcessor: string;
  transactionCode: string;
  fundingSource: string;
  source: string;
  paymentCorrelationId: string;
  selected: boolean;
};

export default function Home({ data }: { data: Payee[] }) {
  const [count, setCount] = React.useState(0);
  const [payees, setPayees] = React.useState(data);

  function handleSelected(payeeId: string) {
    setPayees(prev => {
      const newPayees = prev.map(payee => {
        if (payee.payeeId === payeeId) {
          return {
            ...payee,
            selected: !payee.selected,
          };
        }
        return payee;
      });
      return newPayees;
    });
  }

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
          <a
            href="/"
            className={styles.card}
            rel="noopener noreferrer"
            style={{ height: 50 }}
          >
            <p className={inter.className}>Back to Portal</p>
          </a>
          {payees.length > 0 ? (
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
              <div className={styles.payee}>
                {payees.map(payee => {
                  return (
                    <div
                      key={payee.depositTransferId}
                      onClick={() => handleSelected(payee.payeeId)}
                      style={{ padding: 10, fontSize: 16, cursor: "pointer" }}
                    >
                      {payee.payeeId} - {payee.payeeName}
                      {payee.selected && (
                        <p style={{ backgroundColor: "inherit" }}>
                          Amount: ${payee.amount} Number of Bills:{" "}
                          {payee.numberOfBills}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
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
