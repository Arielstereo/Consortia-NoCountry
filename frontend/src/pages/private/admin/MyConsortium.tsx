import { Link } from 'react-router-dom'
import { userStore } from '../../../store/user'
import { useTitle } from '../../../store/title'
import { UserProfile } from '../../../interfaces/userInterfaces'

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

const MyConsortium = ({ setMenu }: Props) => {
  const user = userStore<UserProfile | null>((state) => state.userData)
  const handleClick = () => {
    setMenu('Create consortium')
  }

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('My consortia')

  return (
    <section className="pb-12">
      <div className=" hidden sm:block text-center sm:text-start font-bold text-xl text-blueDark mt-6 sm:ml-11 sm:mt-7">
        <h3>My consortia</h3>
      </div>
      <div className="flex flex-wrap max-w-md mx-auto overflow-hidden md:max-w-2xl justify-center sm:justify-start gap-4 sm:gap-2 lg:gap-4 xl:gap-10 mt-8  sm:mx-4 md:ml-20 xl:ml-16 2xl:ml-32">
        {user?.consortium?.map(
          (consortium) =>
            consortium.status === 'active' && (
              <div
                className=" w-[270px] h-[160px] overflow-hidden rounded-lg border border-blueDark relative items-center flex"
                key={consortium._id}
              >
                <Link
                  to={`/admin/editinfo/${consortium._id}`}
                  className="absolute top-2 right-2 z-10 bg-slate-300 bg-opacity-80 rounded-full w-8 h-8 "
                >
                  <img
                    src="../assets/edit.png"
                    alt=""
                    className="mx-auto pt-1"
                  />
                </Link>
                <Link
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  to={`/admin/consortium/${consortium._id}`}
                  className="w-[270px] drop-shadow-2xl"
                >
                  <img
                    src={consortium.img}
                    alt="card"
                    className=" "
                  />
                </Link>
                <span className="text-lg text-center absolute bottom-0 w-full border-t-2 border-black bg-slate-300 bg-opacity-80">
                  {consortium.name}
                </span>
              </div>
            ),
        )}
        <button
          onClick={handleClick}
          className="flex flex-col items-center bg-blueDark w-[270px] h-[160px] rounded-lg border-2 border-black drop-shadow-2xl"
        >
          <img
            src="../assets/Vector.png"
            alt="icon"
            className="mt-8 mb-4 rounded-full border-4 border-white p-2 w-14"
          />
          <p className="text-white text-center text-lg pb-2">Add consortium</p>
        </button>
      </div>
    </section>
  )
}

export default MyConsortium
