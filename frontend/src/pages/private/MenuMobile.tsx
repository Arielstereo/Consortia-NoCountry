import { userStore } from '../../store/user'
import { useTitle } from '../../store/title'

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

const MenuMobile = ({ setMenu }: Props) => {
  const user = userStore((state) => state.userData)

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('Menu')

  return (
    <div className=" text-[#324054] text-base">
      <h2 className=" text-2xl font-bold text-blueDark my-8 text-center">Welcome {user?.name}</h2>
      <button
        className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
        onClick={() => {
          setMenu('profile')
        }}
      >
        <img
          src="/assets/icons/Person.svg"
          alt=""
          className="h-5 mx-4 lg:mx-2"
        />
        <span className="">My Profile</span>
      </button>
      {user?.role === 'tenant' && (
        <>
          <button
            className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
            onClick={() => {
              setMenu('information')
            }}
          >
            <img
              src="/assets/icons/Info.svg"
              alt=""
              className="h-5 mx-4 lg:mx-2"
            />
            <span>Information</span>
          </button>
          <button
            className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
            onClick={() => {
              setMenu('payments')
            }}
          >
            <img
              src="/assets/icons/Payments.svg"
              alt=""
              className="h-5 mx-4 lg:mx-2"
            />
            <span>My Payments</span>
          </button>
          <button
            className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
            onClick={() => {
              setMenu('amenities')
            }}
          >
            <img
              src="/assets/icons/Amenities.svg"
              alt=""
              className="h-5 mx-4 lg:mx-2"
            />
            <span>Ameneties</span>
          </button>
          <button
            className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
            onClick={() => {
              setMenu('complaint')
            }}
          >
            <img
              src="/assets/icons/Complaints.svg"
              alt=""
              className="h-5 mx-4 lg:mx-2"
            />
            <span>Complaints</span>
          </button>
        </>
      )}
      { user?.role === 'admin' && <button
            className="flex py-3 border-2 w-[80vw] mx-auto rounded-lg border-[#324054] my-5"
            onClick={() => {
              setMenu('My consortiums')
            }}
          >
            <img
              src="/assets/icons/Complaints.svg"
              alt=""
              className="h-5 mx-4 lg:mx-2"
            />
            <span>My Consortium</span>
          </button>
        }
    </div>
  )
}

export default MenuMobile
