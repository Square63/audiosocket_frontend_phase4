import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/Layout";
import '../styles/globals.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
