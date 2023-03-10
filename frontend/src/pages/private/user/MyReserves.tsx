import { useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/auth'
import { GetReserve } from '../../../interfaces/reserveInterface'
import getReserveService from '../../../services/getReservesService'
import UserAmenities from './UserAmenities'
import { useTitle } from '../../../store/title'

const MyReserves = () => {
  const [create, setCreate] = useState(false)
  const [reserves, setReserves] = useState<GetReserve[]>()

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('My reservations')

  const userId = useAuthStore((state) => state.id)

  const getReserves = async () => {
    const res = (await getReserveService(userId)) as GetReserve[]
    setReserves(res)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getReserves()
  }, [create])

  return (
    <div>
      {!create ? (
        <>
          <div className="flex font-bold text-xl text-blueDark ml-11 sm:mt-10">
            <div className=" hidden sm:flex gap-x-6 text-blueDark font-bold text-xl items-center">
              <h3>My reservations</h3>
            </div>
          </div>
          <div className=" mx-4 sm:mx-12">
            <table className="w-full text-left my-12">
              <thead>
                <tr className=" border-b border-b-greyLight">
                  <th>Amenity</th>
                  <th>From</th>
                  <th>To</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {reserves?.map((res) => (
                  <tr
                    className=" border-b border-b-greyLight"
                    key={res._id}
                  >
                    <td className="py-4">{res.amenity.name}</td>
                    <td className="py-4">
                      {res.startDate.slice(0, 10)} {res.startHour}
                    </td>
                    <td className="py-4">
                      {res.endDate.slice(0, 10)} {res.endHour}
                    </td>
                    <td className="py-4">{res.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-blueDark disabled:opacity-60 text-white text-xl w-60 h-12 rounded-2xl block mx-auto mt-8 mb-5"
            onClick={() => {
              setCreate(true)
            }}
          >
            New Reserve
          </button>
        </>
      ) : (
        <UserAmenities setCreate={setCreate} />
      )}
    </div>
  )
}

export default MyReserves
