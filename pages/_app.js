import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/Layout";
import '../styles/globals.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from '../redux/store';
// import { Provider } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { useCookie } from 'next-cookie'


axios.interceptors.request.use(request => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  request.headers.Authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8';
  request.headers['auth-token'] = authToken ? authToken : ""
  return request;
});



function MyApp({ Component, pageProps }) {
  // const [cartCount, setCartCount] = useState(0);
  return (

    <Layout>
      <Component {...pageProps} />
    </Layout>

  )
}

export default wrapper.withRedux(MyApp)
