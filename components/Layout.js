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
      <div className="container content-area">
        <main className="main">
          {router.pathname.indexOf('/user/') !== -1 &&
            <Sidebar/>
          }
          {children}
        </main>
      </div>
      <Footer/>
    </AuthProvider>
  )
}
export default Layout;