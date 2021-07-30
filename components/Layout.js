import Header from "./Header";
import Footer from "./Footer";
import {AuthProvider} from "../store/authContext";

function Layout({children}) {
  return (
    <AuthProvider>
      <Header/>
      <div className="container content-area">
        <main className="main">
          {children}
        </main>
      </div>
      <Footer/>
    </AuthProvider>
  )
}
export default Layout;