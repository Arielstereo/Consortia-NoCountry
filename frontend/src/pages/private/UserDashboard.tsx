import { useEffect, useState } from 'react'
import HeroUser from '../../components/HeroUser'
import UserInformation from './user/UserInformation'
import UserAmenities from './user/UserAmenities'
import { userStore } from '../../store/user'
import UserComplaints from './user/UserComplaints'
import UserProfileData from './user/UserProfileData'
import UserDocuments from './user/UserDocuments'
import Logout from '../../components/Logout'
import { useLocation } from 'react-router-dom'

const defaultImg = '/assets/defaultUser.svg'

const UserDashboard = () => {
  const [menu, setMenu] = useState('profile')
  const [logout, setLogout] = useState(false)

  const user = userStore((state) => state.userData)

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setMenu(location.state.show)
    }
  }, [location])

  return (
    <HeroUser>
      <div className=" w-full h-fit px-10">
        <div className="flex min-h-[560px] pt-12 justify-center">
          <div className=" hidden sm:inline bg-[#BFD5FF] bg-opacity-70 min-w-[200px] lg:min-w-[268px] border-2 border-black rounded-lg p-5 relative">
            <div className="lg:flex mt-5 mb-3 lg:mb-10 text-center ">
              <div className="rounded-full h-[90px] w-[90px] overflow-hidden border-2 border-black relative mx-auto">
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
            <div className={`block ${menu === 'profile' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
              <button
                className="flex items-center py-3"
                onClick={() => {
                  setMenu('profile')
                }}
              >
                <img
                  src="/assets/icons/Person.svg"
                  alt=""
                  className=" h-5 mx-2"
                />
                My profile
              </button>
            </div>
            {user?.role === 'tenant' && (
              <>
                <div className={`block ${menu === 'information' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('information')
                    }}
                  >
                    <img
                      src="/assets/icons/Info.svg"
                      alt=""
                      className=" h-5 mx-2"
                    />
                    Information
                  </button>
                </div>
                <div className={`block ${menu === 'payments' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('payments')
                    }}
                  >
                    <img
                      src="/assets/icons/Payments.svg"
                      alt=""
                      className=" h-5 mx-2"
                    />
                    My Payments
                  </button>
                </div>
                <div className={`block ${menu === 'amenities' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('amenities')
                    }}
                  >
                    <img
                      src="/assets/icons/Amenities.svg"
                      alt=""
                      className=" h-5 mx-2"
                    />
                    Amenities
                  </button>
                </div>
                <div className={`block ${menu === 'complaint' ? 'font-bold bg-[#EFF6FF] rounded-md' : ''}`}>
                  <button
                    className="flex items-center py-3"
                    onClick={() => {
                      setMenu('complaint')
                    }}
                  >
                    <img
                      src="/assets/icons/Complaints.svg"
                      alt=""
                      className=" h-5 mx-2"
                    />
                    Complaints
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
                src="/assets/icons/Logout2.svg"
                alt=""
                className=" h-5 mx-2"
              />
              Logout
            </button>
          </div>
          <div className="bg-[#B4CAE7] bg-opacity-50 w-[880px] border border-black rounded-lg  pb-6">
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
