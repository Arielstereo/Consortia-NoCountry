import { useState } from 'react'
import { userStore } from '../../../store/user'
import UserEditProfile from '../EditProfileDashboard'
import { useAuthStore } from '../../../store/auth'
import removeMembersService from '../../../services/removeMemberService'
import BlueModal from '../../../components/modal/BlueModal'
import { PulseLoader } from 'react-spinners'

const defaultImg = '/assets/defaultUser.svg'

const UserProfile = () => {
  const [edit, setEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = userStore((state) => state.userData)

  const userId = useAuthStore((state) => state.id)
  const consortiumId = user?.consortium?.find(() => true)?._id
  const consortiumAddress = user?.consortium?.find(() => true)?.address

  const handleDelete = async () => {
    console.log(userId, consortiumId)

    if (userId && consortiumId) {
      setLoading(true)
      await removeMembersService(consortiumId, userId)
      setLoading(false)
      setModal(false)
    }
  }

  return (
    <div className="hidden sm:inline">
      {!edit ? (
        <>
          <div className="flex font-bold text-xl text-blueDark ml-11 mt-7">
            <h3>My Profile</h3>
            <img
              src="/assets/icons/Edit.svg"
              alt=""
              className=" h-6 ml-3 cursor-pointer"
              onClick={() => {
                setEdit(true)
              }}
            />
          </div>
          <div className=" text-center">
            <div className=" h-[130px] w-[130px] overflow-hidden border-2 border-black rounded-lg relative mx-auto my-6">
              <img
                className="object-cover h-[130px] min-w-full"
                src={user?.img || defaultImg}
                alt=""
              />
            </div>
            <p className=" font-bold text-xl my-6 text-blueDark">
              {user?.name} {user?.lastname}
            </p>
            <p className=" my-6">{user?.email}</p>
            <p className=" my-6">{user?.phone}</p>
            {user?.role === 'tenant' && <p className=" my-6">Address: {consortiumAddress}</p>}
            {user?.role === 'tenant' && <p className=" my-6">Piso|Dto: {user?.apt !== 'NaN' ? user.apt : ''}</p>}
          </div>

          {user?.role === 'tenant' && (
            <button
              className="bg-blueDark disabled:opacity-60 text-white text-sm w-72 h-12 rounded-2xl block mx-auto"
              onClick={() => {
                setModal(true)
              }}
            >
              This is not your consortium?<b> Leave</b>
            </button>
          )}
        </>
      ) : (
        <UserEditProfile setEdit={setEdit} />
      )}
      <BlueModal isOpen={modal}>
        <p>Are you sure you want to leave the consortium?</p>
        <button
          onClick={handleDelete}
          className="bg-blue text-white text-lg w-20 rounded-2xl mt-6 mx-4 h-[29px]"
        >
          {loading ? <PulseLoader color="white" /> : 'YES'}
        </button>
        <button
          onClick={() => {
            setModal(false)
          }}
          className=" bg-blueDark text-white text-lg w-20 rounded-2xl mt-6 mx-4 border-[1.5px] border-blue h-[29px]"
        >
          Cancel
        </button>
      </BlueModal>
    </div>
  )
}

export default UserProfile
