import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import { useAuthStore } from '../store/auth'
import { userStore } from '../store/user'
import getUserByIdService from '../services/getUserByIdService'
import { IResponseUser } from '../interfaces/userInterfaces'
import Titles from './TitleLayout'
import Logout from './Logout'

const Header = () => {
  const [isNavOpen, setisNavOpen] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [logout, setLogout] = useState(false)

  const userId = useAuthStore((state) => state.id)
  const setUser = userStore((state) => state.setData)
  const user = userStore((state) => state.userData)

  const location = useLocation()
  const path = location.pathname
  const showNav = path.substring(0, 5) === '/user' || path.substring(0, 6) === '/admin'

  const { headerTitle } = Titles()

  const getUser = async () => {
    try {
      const res = (await getUserByIdService(userId)) as IResponseUser
      setUser(res.user)
    } catch (error) {
      console.log('error')
    }
  }

  const refOne = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    if (refOne.current && !refOne.current.contains(target)) {
      setisNavOpen(false)
    }
  }

  const pageUp = () => {
    window.scroll(0, 0)
  }

  useEffect(() => {
    if (userId !== '') {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser()
      setAvatarOpen(true)
    } else {
      setAvatarOpen(false)
    }
  }, [userId])

  const handleOpenNav = () => {
    setisNavOpen(!isNavOpen)
  }

  return (
    <header className={`${!showNav ? 'hidden sm:inline' : ''}`}>
      <div className="bg-blueDark fixed z-50 w-full">
        <nav className=" h-[60px] sm:h-20 flex flex-wrap items-center justify-between md:justify-around w-full px-3 text-[15px] xl:w-[1200px] xl:mx-auto ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-8 w-8 cursor-pointer sm:hidden text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleOpenNav}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <h1 className=" text-4xl text-white font-bold sm:hidden">{headerTitle}</h1>
          <img
            className=" h-8 sm:hidden"
            src="/assets/icons/Notif.svg"
            alt=""
          />
          <Link
            to=""
            className="hidden sm:inline"
          >
            <img
              src="/assets/Logo.svg"
              alt=""
              className=" sm:h-16 md:h-[78px] cursor-pointer "
            />
          </Link>
          <ul className="text-xs md:text-[15px] text-white items-center justify-between hidden w-full sm:flex sm:items-center sm:w-auto">
            <li className="min-w-fit">
              <Link
                onClick={pageUp}
                to=""
                className="uppercase p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in"
              >
                Home
              </Link>
            </li>
            <li className="min-w-fit">
              <Link
                onClick={pageUp}
                to="/about"
                className="uppercase p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in"
              >
                About Us
              </Link>
            </li>
            <li className="min-w-fit">
              <Link
                onClick={pageUp}
                to="/features"
                className="uppercase p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in"
              >
                Features
              </Link>
            </li>
            <li className="min-w-fit">
              <Link
                onClick={pageUp}
                to="/contact"
                className="uppercase p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in"
              >
                Contact
              </Link>
            </li>
          </ul>
          {!avatarOpen ? (
            <section className=" text-xs md:text-[15px] hidden sm:flex justify-center sm:p-5 gap-2 md:gap-5">
              <Link to="/login">
                <button className="uppercase sm:px-3 md:px-8 py-1 bg-blue rounded-[16px] text-white min-w-fit hover:brightness-150 transition duration-300 ease-out hover:ease-in ">
                  Log In
                </button>
              </Link>
              <Link to="/signin">
                <button className="uppercase sm:px-3 md:px-8 py-1 bg-blueDark rounded-[16px] text-[#3189FF] border-[1px] border-[#3189FF] hover:border-[#ffff] hover:text-[#ffff] transition duration-300 ease-out hover:ease-in min-w-fit">
                  Sign In
                </button>
              </Link>
            </section>
          ) : (
            <section className=" hidden sm:inline">
              <UserNavbar />
            </section>
          )}
        </nav>
        <div ref={refOne}>
          <ul
            className={
              (isNavOpen ? '' : 'hidden ') +
              ' sm:hidden w-[170px] h-auto absolute bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg m-0 bg-clip-padding border-none'
            }
            aria-labelledby="dropdownMenuButton1d"
            onClick={() => {
              setisNavOpen(false)
            }}
          >
            <li className="">
              <Link
                state={{ show: 'profile' }}
                className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                to={`${user?.role === 'admin' ? 'admin' : 'user'}`}
              >
                Profile
              </Link>
            </li>
            {user?.role === 'admin' && (
              <li className="">
                <Link
                  state={{ show: 'My consortiums' }}
                  className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                  to="admin"
                >
                  My Consortia
                </Link>
              </li>
            )}
            {user?.role === 'tenant' && (
              <>
                <li className="">
                  <Link
                    state={{ show: 'information' }}
                    className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                    to="user"
                  >
                    Information
                  </Link>
                </li>
                <li className="">
                  <Link
                    state={{ show: 'payments' }}
                    className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                    to="user"
                  >
                    My payments
                  </Link>
                </li>
                <li className="">
                  <Link
                    state={{ show: 'amenities' }}
                    className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                    to="user"
                  >
                    Amenities
                  </Link>
                </li>
                <li className="">
                  <Link
                    state={{ show: 'complaint' }}
                    className="dropdown-item text-sm rounded-lg py-4 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-black hover:bg-[#DEDEDE]"
                    to="user"
                  >
                    Complaints
                  </Link>
                </li>
              </>
            )}
            <li className="">
              <button
                className=" flex justify-between items-center dropdown-item text-sm text-start rounded-lg py-4 px-4 w-full whitespace-nowrap bg-transparent text-blueDark font-[700] hover:bg-[#DEDEDE]"
                onClick={() => {
                  setLogout(true)
                }}
              >
                Logout
                <img
                  src="/assets/icons/Logout.svg"
                  alt=""
                  className=" h-10"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Logout
        logout={logout}
        setLogout={setLogout}
      />
    </header>
  )
}

export default Header
