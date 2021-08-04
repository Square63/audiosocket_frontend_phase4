import Header from "./Header";
import Footer from "./Footer";
import {AuthProvider} from "../store/authContext";
import {useRouter} from "next/router";
import Sidebar from "./Sidebar";

function Layout({children}) {
  const router = useRouter();

  return (
    <AuthProvider>
      <Header/>
      <div className="content-area">
        <main className="main">
          {router.pathname.toLowerCase().indexOf('/user/') !== -1
            ?
              <div className="userAccountWrapper">
                <div className="userAcountHeading">
                  <h1>Kevin sajjad</h1>
                </div>
                <div className="userAccountInner">
                  <Sidebar/>
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