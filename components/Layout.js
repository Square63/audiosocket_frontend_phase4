import Header from "./Header";
import Footer from "./Footer";
import {AuthProvider} from "../store/authContext";
import {useRouter} from "next/router";
import ProfileMenu from "./ProfileMenu";
import {useEffect, useState} from "react";
import Image from 'next/image';
import logo from "../images/logo-black.svg";
import user from "../styles/User.module.scss";


function Layout({children}) {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    setTimeout(function() {
      setLoading(false)
    }.bind(this), 500);
    return () => {
      isMounted = false;
    };
  },[]);


  useEffect(() => {
    if(localStorage.getItem('user')) {
      setUserName(JSON.parse(localStorage.getItem("user") ?? ""));
    }
    if(process.env.ANALYTICS_WRITE_KEY) {
      let path = router.pathname;
      let title = path === '/' ? path : path.replace('/', '').replaceAll('/',' ');
      global.analytics.page(title, {
        title: title,
        path: path
      });
    }
  }, [])

  return (
    <>
      {loading ? (
        <div className="siteLoader">
          <div className="brandLogo">
            <Image src={logo} alt="LOGO" className="loaderLogo" />
          </div>
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      ) : (
        <AuthProvider >
          <Header/>
          <div className="content-area">
            <main className="main">
              {router.pathname.toLowerCase().indexOf('/user/') !== -1
                ?
                  <div className={user.accountWrapper}>
                    <div className="fixed-container">
                      <div className={user.accountHeader}>
                        <h1>Account</h1>
                        <ProfileMenu />
                      </div>
                      <div className="userAccountInner">
                        {children}
                      </div>
                    </div>
                  </div>
                : children
              }
            </main>
          </div>
          <Footer/>
        </AuthProvider>
      )}

    </>
  )
}
export default Layout;
