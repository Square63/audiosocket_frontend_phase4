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
          <div className="userAccountWrapper">
            <div className="userAcountHeading">
              <h1>Kevin sajjad</h1>
            </div>
            <div className="userAccountInner">
              {router.pathname.indexOf('/user/') !== -1 &&
                <Sidebar/>
              }
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </AuthProvider>
  )
}
export default Layout;