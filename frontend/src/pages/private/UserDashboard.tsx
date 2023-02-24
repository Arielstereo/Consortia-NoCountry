import { useState } from 'react'
import HeroUser from '../../components/HeroUser'
import UserInformation from './user/UserInformation'
import UserAmenities from './user/UserAmenities'
import { userStore } from '../../store/user'
import UserComplaints from './user/UserComplaints'
import UserProfileData from './user/UserProfileData'
import UserDocuments from './user/UserDocuments'
import Logout from '../../components/Logout'

const defaultImg = '/assets/defaultUser.svg'

const UserDashboard = () => {
  const [menu, setMenu] = useState('profile')
  const [logout, setLogout] = useState(false)

  const user = userStore((state) => state.userData)

  return (
    <HeroUser>
      <div className=" w-full h-fit px-10">
        <div className="flex min-h-[560px] pt-12 justify-center">
          <div className="bg-blueUser bg-opacity-70 min-w-[268px] border-2 border-black rounded-lg pl-7 pr-2 relative">
            <div className="flex mt-10 mb-6 ">
              <div className="rounded-full h-[90px] w-[90px] overflow-hidden border-2 border-black relative">
                <img
                  className="object-cover h-[90px] min-w-full"
                  src={user?.img || defaultImg}
                  alt=""
                />
              </div>
              <div className="text-base text-center mx-auto">
                <p className=" font-bold">
                  {user?.name} {user?.lastname}
                </p>
                {user?.role === 'tenant' && <p>Owner</p>}
              </div>
            </div>
            <button
              className={`block py-3 ${menu === 'profile' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('profile')
              }}
            >
              My profile
            </button>
            {user?.role === 'tenant' && (
              <>
                <button
                  className={`block py-3 ${menu === 'information' ? 'font-bold' : ''}`}
                  onClick={() => {
                    setMenu('information')
                  }}
                >
                  Information
                </button>
                <button
                  className={`block py-3 ${menu === 'payments' ? 'font-bold' : ''}`}
                  onClick={() => {
                    setMenu('payments')
                  }}
                >
                  My payments
                </button>
                <button
                  className={`block py-3 ${menu === 'amenities' ? 'font-bold' : ''}`}
                  onClick={() => {
                    setMenu('amenities')
                  }}
                >
                  Amenities
                </button>
                <button
                  className={`block py-3 ${menu === 'complaint' ? 'font-bold' : ''}`}
                  onClick={() => {
                    setMenu('complaint')
                  }}
                >
                  Complaints
                </button>
              </>
            )}
            <button
              className="block py-3 absolute bottom-6 font-bold"
              onClick={() => {
                setLogout(true)
              }}
            >
              Logout
            </button>
          </div>
          <div className="bg-blue bg-opacity-50 w-[880px] border border-black rounded-lg  pb-6">
            {menu === 'profile' && <UserProfileData />}
            {menu === 'information' && <UserInformation />}
            {menu === 'amenities' && <UserAmenities />}
            {menu === 'complaint' && <UserComplaints />}
            {menu === 'payments' && <UserDocuments />}
          </div>
        </div>
      </div>
      <Logout
        logout={logout}
        setLogout={setLogout}
      />
    </HeroUser>
  )
}

export default UserDashboard
