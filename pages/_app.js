import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/Layout";
import '../styles/globals.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from '../redux/store';
import axios from 'axios';
import { useCookie } from 'next-cookie'


axios.interceptors.request.use(request => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  request.headers.Authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.9kL4HmyjCYJgdpBHX1g3JHAp235eKlLAO_vcPb4bYGk';
  if (typeof window !== 'undefined') {
    request.headers['auth-token'] = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).replace(/['"]+/g, '') : ""
  } else {
    request.headers['auth-token'] = authToken ? authToken : ""
  }

  return request;
});



function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)
