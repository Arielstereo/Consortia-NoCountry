import { useState } from 'react'
import CreateConsortium from './admin/CreateConsortium'
import MyConsortium from './admin/MyConsortium'
import EditConsortium from './admin/EditConsortium'
import { userStore } from '../../store/user'
import UserProfile from './user/UserProfileData'
import Logout from '../../components/Logout'
import Profile from './admin/MobileProfile'
import HeroUser from '../../components/HeroUser'

const defaultImg = '/assets/defaultUser.svg'

const adminDashboard = () => {
  const user = userStore((state) => state.userData)
  const [logout, setLogout] = useState(false)
  const [menu, setMenu] = useState('My consortiums')

  return (
    <HeroUser>
      <div className="hidden sm:inline w-full h-fit px-10">
        <div className="flex min-h-[560px] pt-12 justify-center">
          <div className=" hidden sm:inline bg-[#BFD5FF] bg-opacity-70 min-w-[80px] lg:min-w-[268px] border-2 border-black rounded-lg p-5 relative">
            <div className="lg:flex mt-5 mb-3 lg:mb-10 text-center ">
              <div className="rounded-full h-[60px] md:h-[65px] lg:h-[90px] w-[60px] md:w-[65px] lg:w-[90px] overflow-hidden border-2 border-black relative mx-2 lg:mx-auto">
                <img
                  className="object-cover lg:h-[90px] min-w-full"
                  src={user?.img || defaultImg}
                  alt="photo"
                />
              </div>
              <div className="hidden lg:inline text-base text-center mx-auto">
                <p className=" font-bold">
                  {user?.name} {user?.lastname}
                </p>
                {user?.role === 'admin' && <p>Administrator</p>}
              </div>
            </div>
            <div className="mt-16 lg:mt-0">
              <div className={`block ${menu === 'Profile' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                <button
                  className="flex items-center py-3"
                  onClick={() => {
                    setMenu('Profile')
                  }}
                >
                  <img
                    src="/assets/icons/Person.svg"
                    alt=""
                    className="h-5 mx-4 lg:mx-2"
                  />
                  <span className="hidden lg:inline">My Profile</span>
                </button>
              </div>
              <div className={`block ${menu === 'My consortiums' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                <button
                  className="flex items-center py-3"
                  onClick={() => {
                    setMenu('My consortiums')
                  }}
                >
                  <img
                    src="/assets/icons/Complaints.svg"
                    alt=""
                    className="h-5 mx-4 lg:mx-2"
                  />
                  <span className="hidden lg:inline">My consortiums</span>
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
                src="/assets/icons/Logout2.svg"
                alt=""
                className="h-5 mx-4 lg:mx-2"
              />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
          <div className="bg-[#B4CAE7] bg-opacity-50 w-[880px] border border-black rounded-lg  pb-6">
            {menu === 'Profile' && <UserProfile />}
            {menu === 'My consortiums' && <MyConsortium setMenu={setMenu} />}
            {menu === 'Create consortium' && <CreateConsortium />}
            {menu === 'Edit consortium' && <EditConsortium />}
          </div>
        </div>
      </div>
      <Logout
        logout={logout}
        setLogout={setLogout}
      />
      <div className="sm:hidden w-full h-full overflow-y-scroll no-scrollbar">
        {menu === 'Profile' && <Profile />}
        {menu === 'My consortiums' && <MyConsortium setMenu={setMenu} />}
      </div>
    </HeroUser>
  )
}

export default adminDashboard
