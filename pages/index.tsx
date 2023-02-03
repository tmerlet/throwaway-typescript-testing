import Head from 'next/head';
import Image from 'next/image';

import styles from '@/pages/index.module.css';
import AddWord from '@/components/AddWord';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AddWord />
    </div>
  );
}
