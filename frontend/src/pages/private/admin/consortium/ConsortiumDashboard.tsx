import { useEffect, type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { userStore } from '../../../../store/user'
import getConsortiumService from '../../../../services/getConsortiumService'
import { useTitle } from '../../../../store/title'

interface ConsortiumDashboardProps {
  name?: string
}
export const ConsortiumDashboard: FC<ConsortiumDashboardProps> = ({ name = 'Admin' }: ConsortiumDashboardProps) => {
  const { id } = useParams<{ id: string }>()
  const user = userStore((state) => state.userData)

  const setTitle = useTitle((state) => state.setTitle)

  const getConsortium = async () => {
    setTitle('Consortium')
    if (id) {
      const consortium = await getConsortiumService(id)
      setTitle(consortium.address)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getConsortium()
  }, [])

  const actions = [
    {
      id: 1,
      name: 'Edit information',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `editinfo/${id}`,
      img: 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/edit_lgdzbk.png',
    },
    {
      id: 2,
      name: 'Payments',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `payments/${id}`,
      img: 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/payment_sphp7h.png',
    },
    {
      id: 3,
      name: 'Entrances and exits',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `entrance/${id}`,
      img: 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/enterExit_etm7gz.png',
    },
    {
      id: 4,
      name: 'Events',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `events/${id}`,
      img: 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/events_jlmrae.png',
    },
    {
      id: 5,
      name: 'Members',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      path: `members/${id}`,
      img: 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157940/members_gahqhk.png',
    },
  ]

  return (
    <div className="m-auto max-w-screen-xl flex flex-col justify-start items-center gap-4 pb-10 relative mb-32">
      <div
        className="text-blueDark w-full p-4 sm:p-10 max-w-screen-xl m-auto text-2xl font-bold font-inter text-center
        md:text-left md:text-3xl
        lg:pl-28 flex
        "
      >
        <Link
          to="/admin"
          state={{ show: 'My consortiums' }}
        >
          <img
            className="w-[14px] mr-6"
            src={'/assets/icons/left-arrow.svg'}
          />
        </Link>
        Welcome {user?.name}!
      </div>
      <div
        className="grid grid-cols-1 grid-flow-rows gap-4
                     sm:grid-cols-2
                     lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-20"
      >
        {actions.map((action) => (
          <Link
            to={`/admin/${action.path}`}
            key={action.id}
            className="relative w-[300px]"
          >
            <img
              className="w-full -z-10"
              src={action.img}
              alt={action.name}
            />
            <p className="absolute bottom-0 left-0 right-0 rounded z-10 text-center font-inter font-normal text-lg border-2 border-black bg-blueLight ">
              {action.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
