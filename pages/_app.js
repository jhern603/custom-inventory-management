import { useRouter } from 'next/router';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const handleRoute = (e) => {
    router.push('/'+e.target.name);
  }

  return (
    <>
      <nav>
        <input type="button" value="Home" name="" onClick={handleRoute} />
        <input type="button" value="Add New Equipment" name="addEquipment" onClick={handleRoute} />
        <input type="button" value="Get Equipment" name="getEquipment" onClick={handleRoute} />
        <input type="button" value="Checkout Equipment" name="checkoutEquipment" onClick={handleRoute} />
      </nav>
      <Component {...pageProps} />
    </>)
}

export default MyApp
