import { useEffect, useState } from 'react'
import CreateConsortium from './admin/CreateConsortium'
import MyConsortium from './admin/MyConsortium'
import { userStore } from '../../store/user'
import UserProfileData from './user/UserProfileData'
import Logout from '../../components/Logout'
import Profile from './admin/MobileProfile'
import HeroUser from '../../components/HeroUser'
import { useLocation } from 'react-router-dom'
import MenuMobile from './MenuMobile'

const defaultImg = '/assets/defaultUser.svg'

const adminDashboard = () => {
  const [menu, setMenu] = useState('profile')
  const [logout, setLogout] = useState(false)

  const user = userStore((state) => state.userData)

  const location = useLocation()

  useEffect(() => {
    if (location.state?.show) {
      setMenu(location.state?.show)
    }
  }, [location])

  return (
    <HeroUser>
      <div className="hidden sm:inline w-full h-fit px-10">
        <div className="flex min-h-[560px] pt-12 justify-center">
          <div className="hidden sm:inline bg-[#6096B4] bg-opacity-98 min-w-[100px] lg:min-w-[268px]  rounded-lg rounded-r-none p-5 relative">
            <div className="lg:flex mt-5 mb-3 lg:mb-10 text-center">
              <div className="rounded-full h-[65px] lg:h-[90px] w-[65px] lg:w-[90px] overflow-hidden border-2 border-[#002A61] relative mx-auto">
                <img
                  className="object-cover h-full lg:h-[90px] min-w-full"
                  src={user?.img || defaultImg}
                  alt="photo"
                />
              </div>
              <div className="hidden lg:inline text-base text-center mx-auto">
                <p className="font-bold">
                  {user?.name} {user?.lastname}
                </p>
                {user?.role === 'admin' && <p>Administrator</p>}
              </div>
            </div>
            <div className="mt-16 lg:mt-0">
              <div
                className={`block ${menu === 'profile' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semilbold'}`}
              >
                <button
                  className="flex items-center py-3"
                  onClick={() => {
                    setMenu('profile')
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677967555/icons/Person_2_lvcsuj.png"
                    alt=""
                    className="h-5 mx-4 lg:mx-2"
                  />
                  <span className="hidden text-[#002A61] lg:inline">My Profile</span>
                </button>
              </div>
              <div
                className={`block ${
                  menu === 'My consortiums' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'
                }`}
              >
                <button
                  className="flex items-center py-3"
                  onClick={() => {
                    setMenu('My consortiums')
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677969657/icons/u_create-dashboard_fboh9l.png"
                    alt=""
                    className="h-5 mx-4 lg:mx-2"
                  />
                  <span className="hidden text-[#002A61] lg:inline">My consortia</span>
                </button>
              </div>
            </div>
            <button
              className="flex items-center py-3 absolute bottom-6 font-bold"
              onClick={() => {
                setLogout(true)
              }}
            >
              <img
                src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677969759/icons/u_sign-out-alt_algjoz.png"
                alt=""
                className="h-5 mx-4 lg:mx-2"
              />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
          <div className="bg-[#C4E0E5] bg-opacity-98 w-[880px] border rounded-lg rounded-l-none pb-6">
            {menu === 'profile' && <UserProfileData />}
            {menu === 'My consortiums' && <MyConsortium setMenu={setMenu} />}
            {menu === 'Create consortium' && <CreateConsortium setMenu={setMenu} />}
            {/* {menu === 'Edit consortium' && <EditConsortium />} */}
          </div>
        </div>
      </div>
      <Logout
        logout={logout}
        setLogout={setLogout}
      />
      <div className="sm:hidden w-full h-full overflow-y-scroll no-scrollbar">
        {menu === 'profile' && <Profile />}
        {menu === 'My consortiums' && <MyConsortium setMenu={setMenu} />}
        {menu === 'Create consortium' && <CreateConsortium setMenu={setMenu} />}
        {menu === 'menu' && <MenuMobile setMenu={setMenu} />}
      </div>
    </HeroUser>
  )
}

export default adminDashboard
