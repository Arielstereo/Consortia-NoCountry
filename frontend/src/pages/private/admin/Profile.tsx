import { Link } from 'react-router-dom'
import { TitleComponents } from '../../../components/TitleComponents'
import { userStore } from '../../../store/user'
import { useTitle } from '../../../store/title'

const Profile = () => {
  const user = userStore((state) => state.userData)

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('Profile')

  console.log(user)
  return (
    <section>
      <div className="hidden sm:flex gap-4">
        <TitleComponents title="My Profile" />
        <Link
          to=""
          // cambiar a ruta de editar users
          className="mt-10"
        >
          <img
            src="../assets/edit.png"
            alt=""
          />
        </Link>
      </div>
      <div className="hidden sm:flex flex-col items-center sm:mt-8">
        <img
          className="sm:w-28 md:w-32 rounded-full sm:rounded-lg border-2 border-black"
          src={user?.img}
          alt="photo"
        />
        <div className="flex gap-2 ml-8 sm:ml-0">
          <h2 className="sm:mt-12 sm:font-bold text-2xl sm:text-xl md:text-2xl sm:text-blueDark">
            {user?.name} {user?.lastname}
          </h2>
          <Link
            to=""
            // cambiar a ruta de editar users
            className="mt-2 flex sm:hidden"
          >
            <img
              src="../assets/edit.png"
              alt=""
            />
          </Link>
        </div>
        <span className="flex sm:hidden mb-16">{user?.role === 'admin' && 'Administrator'}</span>
        <div className="flex flex-col gap-8 text-center text-lg">
          <span className="flex sm:hidden">{user?.email}</span>
          <span>{user?.phone}</span>
          <span className="hidden sm:flex">Piso-Dto: {user?.apt}</span>
        </div>
      </div>
      <div className="flex sm:hidden flex-col items-center sm:mt-8">
        <div className="bg-blueDark w-full flex justify-center pt-16">
          <img
            className="sm:w-28 md:w-32 rounded-full sm:rounded-lg border-2 border-white -mb-8 sm:-mb-0"
            src={user?.img}
            alt="photo"
          />
        </div>
        <div className="flex gap-2 ml-8 mt-8 sm:mt-0 sm:ml-0">
          <h2 className="sm:mt-12 sm:font-bold text-2xl sm:text-xl md:text-2xl sm:text-blueDark">
            {user?.name} {user?.lastname}
          </h2>
          <Link
            to=""
            // cambiar a ruta de editar users
            className="mt-2 flex sm:hidden"
          >
            <img
              src="../assets/edit.png"
              alt=""
            />
          </Link>
        </div>
        <span className="flex sm:hidden mb-16">{user?.role === 'admin' && 'Administrator'}</span>
        <div className="flex flex-col gap-8 text-center text-lg">
          <span className="flex sm:hidden">{user?.email}</span>
          <span>{user?.phone}</span>
          <span>Piso-Dto: {user?.apt}</span>
          <span className="hidden sm:flex">Piso-Dto: {user?.apt}</span>
        </div>
      </div>
    </section>
  )
}
export default Profile
