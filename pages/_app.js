import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import '../styles/globals.css';

function InventoryManager({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>UPE Inventory Management</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default InventoryManager;
