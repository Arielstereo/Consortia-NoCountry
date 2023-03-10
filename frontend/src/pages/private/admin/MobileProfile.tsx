import { useState } from 'react'
import { userStore } from '../../../store/user'
import UserEditProfile from '../EditProfileDashboard'
import { useTitle } from '../../../store/title'

const Profile = () => {
  const user = userStore((state) => state.userData)
  const [edit, setEdit] = useState(false)

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('Profile')

  return (
    <section>
      {!edit ? (
        <div className="flex sm:hidden flex-col items-center sm:mt-8">
          <div className="bg-blueDark w-full flex justify-center pt-10 h-[140px]">
            <div className="w-[154px] h-[154px] rounded-full overflow-hidden">
              <img
                className="w-[154px] h-[154px] object-cover sm:w-28 md:w-32 rounded-full sm:rounded-lg border-2 border-white -mb-8 sm:-mb-0"
                src={user?.img}
                alt="photo"
              />
            </div>
          </div>
          <div className="flex gap-2 ml-8 mt-20 sm:mt-0 sm:ml-0">
            <h2 className="sm:mt-12 sm:font-bold text-2xl sm:text-xl md:text-2xl sm:text-blueDark">
              {user?.name} {user?.lastname}
            </h2>
            <img
              src="/assets/icons/Edit.svg"
              alt=""
              className=" h-6 ml-3 cursor-pointer"
              onClick={() => {
                setEdit(true)
              }}
            />
          </div>
          <span className="flex sm:hidden mb-16">{user?.role === 'admin' && 'Administrator'}</span>
          <div className="flex flex-col gap-8 text-center text-lg">
            <span className="flex sm:hidden">{user?.email}</span>
            <span>{user?.phone}</span>
            <span>Piso|Dto: {user?.apt}</span>
            <span className="hidden sm:flex">Piso-Dto: {user?.apt}</span>
          </div>
        </div>
      ) : (
        <UserEditProfile setEdit={setEdit} />
      )}
    </section>
  )
}
export default Profile
