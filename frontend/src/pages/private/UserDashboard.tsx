import { useEffect, useState } from 'react'
import HeroUser from '../../components/HeroUser'
import UserInformation from './user/UserInformation'
import { userStore } from '../../store/user'
import UserComplaints from './user/UserComplaints'
import UserProfileData from './user/UserProfileData'
import UserDocuments from './user/userPayments/UserPayments'
import Logout from '../../components/Logout'
import { useLocation } from 'react-router-dom'
import Profile from './admin/MobileProfile'
import MyReserves from './user/MyReserves'
import MenuMobile from './MenuMobile'

const defaultImg = '/assets/defaultUser.svg'

const UserDashboard = () => {
  const [menu, setMenu] = useState('profile')
  const [logout, setLogout] = useState(false)

  const user = userStore((state) => state.userData)

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setMenu(location.state?.show)
    }
  }, [location])

  return (
    <HeroUser>
      <div className="hidden sm:inline w-full h-fit px-10">
        <div className="flex min-h-[560px] pt-12 justify-center">
          <div className="hidden sm:inline bg-[#6096B4] bg-opacity-98 min-w-[100px] lg:min-w-[268px]  rounded-lg rounded-r-none p-5 relative">
            <div className="lg:flex mt-5 mb-3 lg:mb-10 text-center ">
              <div className="rounded-full h-[65px] lg:h-[90px] w-[65px] lg:w-[90px] overflow-hidden border-2 border-[#002A61] relative mx-auto">
                <img
                  className="object-cover h-full lg:h-[90px] min-w-full"
                  src={user?.img || defaultImg}
                  alt=""
                />
              </div>
              <div className="hidden lg:inline text-base text-center mx-auto">
                <p className=" font-bold">
                  {user?.name} {user?.lastname}
                </p>
                {user?.role === 'tenant' && <p>Owner</p>}
              </div>
            </div>
            <div className={`block ${menu === 'profile' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'}`}>
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
            {user?.role === 'tenant' && (
              <>
                <div
                  className={`block ${
                    menu === 'information' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'
                  }`}
                >
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('information')
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677967215/icons/Info_zfhuj5.png"
                      alt=""
                      className="h-5 mx-4 lg:mx-2"
                    />
                    <span className="hidden text-[#002A61] lg:inline">Information</span>
                  </button>
                </div>
                <div
                  className={`block ${menu === 'payments' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'}`}
                >
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('payments')
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677967629/icons/Payments_n7zpay.png"
                      alt=""
                      className="h-5 mx-4 lg:mx-2"
                    />
                    <span className="hidden text-[#002A61] lg:inline">My Payments</span>
                  </button>
                </div>
                <div
                  className={`block ${menu === 'amenities' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'}`}
                >
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('amenities')
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677967774/icons/u_analysis_zbuwsz.png"
                      alt=""
                      className="h-5 mx-4 lg:mx-2"
                    />
                    <span className="hidden text-[#002A61] lg:inline">Ameneties</span>
                  </button>
                </div>
                <div
                  className={`block ${menu === 'complaint' ? 'font-bold lg:bg-[#EFF6FF] rounded-md' : 'font-semibold'}`}
                >
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('complaint')
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677969657/icons/u_create-dashboard_fboh9l.png"
                      alt=""
                      className="h-5 mx-4 lg:mx-2"
                    />
                    <span className="hidden text-[#002A61] lg:inline">Complaints</span>
                  </button>
                </div>
              </>
            )}
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
              <span className="hidden text-[#002A61] lg:inline">Logout</span>
            </button>
          </div>
          <div className="bg-[#C4E0E5] bg-opacity-98 w-[880px] border rounded-lg rounded-l-none pb-6">
            {menu === 'profile' && <UserProfileData />}
            {menu === 'information' && <UserInformation />}
            {menu === 'amenities' && <MyReserves />}
            {menu === 'complaint' && <UserComplaints setMenu={setMenu} />}
            {menu === 'payments' && <UserDocuments />}
          </div>
        </div>
      </div>
      <Logout
        logout={logout}
        setLogout={setLogout}
      />
      <div className="sm:hidden w-full h-full overflow-y-scroll no-scrollbar">
        {menu === 'profile' && <Profile />}
        {menu === 'information' && <UserInformation />}
        {menu === 'amenities' && <MyReserves />}
        {menu === 'complaint' && <UserComplaints setMenu={setMenu} />}
        {menu === 'payments' && <UserDocuments />}
        {menu === 'menu' && <MenuMobile setMenu={setMenu} />}
      </div>
    </HeroUser>
  )
}

export default UserDashboard
