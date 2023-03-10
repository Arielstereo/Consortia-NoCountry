import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import MobileBar from './MobileBar'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col obj ">
      <div className="min-h-fit h-[60px] sm:h-20">
        <Header />
      </div>
      <Outlet />
      <div className=" hidden sm:block ">
        <Footer />
      </div>
      <div className=" fixed bottom-2 right-1/2 translate-x-1/2 z-50">
        <MobileBar />
      </div>
    </div>
  )
}

export default Layout
