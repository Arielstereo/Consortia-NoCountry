import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const MobileBar = () => {
  const role = useAuthStore((state) => state.role)
  const location = useLocation()
  const path = location.pathname
  const showNav = path.substring(0, 5) === '/user' || path.substring(0, 6) === '/admin'

  return (
    <div className={`${!showNav ? 'hidden' : ' sm:hidden'}`}>
      <div className={`shadow-lg bg-white w-[90vw] h-[60px] rounded-lg flex px-5 ${role === 'tenant' ? 'justify-between' : 'justify-around'} items-center z-50 `}>
        <div>
          <Link
            to={`${role === 'admin' ? '/admin' : '/user'}`}
            state={{ show: 'menu' }}
          >
            <img
              src="/assets/icons/Home.svg"
              alt=""
              className=" h-12"
            />
          </Link>
          {(path === '/admin' || path === '/user') && location.state?.show === 'menu' && (
            <div className=" w-12 h-1 bg-blueDark rounded-full"></div>
          )}
        </div>
        {role === 'tenant' &&
          <Link to="/user/notifications">
            <img
              src="/assets/icons/Events.svg"
              alt=""
              className=" h-12"
            />
            {path === '/user/notifications' && <div className=" w-12 h-1 bg-blueDark rounded-full"></div>}
          </Link>}
        <Link
          to={`${role === 'admin' ? '/admin' : '/user'}`}
          state={{ show: 'profile' }}
        >
          <img
            src="/assets/icons/Profile.svg"
            alt=""
            className=" h-12"
          />
          {(path === '/admin' || path === '/user') && location.state?.show === 'profile' && (
            <div className=" w-12 h-1 bg-blueDark rounded-full"></div>
          )}
        </Link>
      </div>
    </div>
  )
}

export default MobileBar
