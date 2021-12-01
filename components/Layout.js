import Header from "./Header";
import Footer from "./Footer";
import {AuthProvider} from "../store/authContext";
import {useRouter} from "next/router";
import ProfileMenu from "./ProfileMenu";
import {useEffect, useState} from "react";

function Layout({children}) {
  const router = useRouter();
  const [userName, setUserName] = useState('');

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
  })
  return (
    <AuthProvider>
      <Header/>
      <div className="content-area">
        <main className="main">
          {router.pathname.toLowerCase().indexOf('/user/') !== -1
            ?
              <div className="userAccountWrapper">
                <div className="userAcountHeading">
                  <h1>Account</h1>
                  <ProfileMenu/>
                </div>
                <div className="userAccountInner">
                  {children}
                </div>
              </div>
            : children
          }
        </main>
      </div>
      <Footer/>
    </AuthProvider>
  )
}
export default Layout;
