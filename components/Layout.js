import Header from "./Header";
import Footer from "./Footer";

function Layout({children}) {
  return (
    <>
      <Header/>
      <div className="container">
        <main className="main">
          {children}
        </main>
      </div>
      <Footer/>
    </>
  )
}
export default Layout;