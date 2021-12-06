import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../components/Layout";
import '../styles/globals.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { wrapper } from '../redux/store';
// import { Provider } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';

axios.interceptors.request.use(request => {
  request.headers.Authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8';
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
