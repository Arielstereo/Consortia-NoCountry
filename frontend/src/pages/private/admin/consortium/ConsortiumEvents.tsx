import { PulseLoader } from 'react-spinners'
import WhiteModal from '../../../../components/modal/WhiteModal'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import BlueModal from '../../../../components/modal/BlueModal'
import { useAuthStore } from '../../../../store/auth'
import { Notification } from '../../../../interfaces/notificationInterfaces'
import createNotificationsService from '../../../../services/createNotificationsService'
import getNotificationsService from '../../../../services/getNotificationsService'
import Accordion from '../../../../components/Accordion'
import { useNavigate, useParams } from 'react-router-dom'
import { useTitle } from '../../../../store/title'
import getConsortiumService from '../../../../services/getConsortiumService'

interface Entrance {
  subject: string
  description: string
}

const ConsortiumEvents = () => {
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<Notification[]>()
  const [modal, setModal] = useState(false)
  const [modalOk, setModalOk] = useState(false)
  const [activeIndex, setActiveIndex] = useState('')
  const [restart, setRestart] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()

  const setTitle = useTitle((state) => state.setTitle)

  const getConsortium = async () => {
    setTitle('Consortium')
    if (id) {
      const consortium = await getConsortiumService(id)
      setTitle(consortium.address)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<Entrance>({ mode: 'onTouched' })

  const userId = useAuthStore((state) => state.id)

  const customSubmit: SubmitHandler<Entrance> = async (data: Entrance) => {
    const { subject, description } = data
    if (id) {
      const notifData: Notification = {
        subject,
        description,
        consortium: id,
        issuer: userId,
        type: 'events',
        creationDate: Date.now(),
      }
      setLoading(true)
      await createNotificationsService(notifData)
      setRestart(!restart)
      setModal(false)
      setModalOk(true)
      setLoading(false)
    }
  }

  const getNotifications = async (id: string) => {
    const notifications: Notification[] = await getNotificationsService(id)
    const entrances = notifications.filter((not) => not.type === 'events')
    setNotification(entrances)
  }

  useEffect(() => {
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getNotifications(id)
    }
  }, [id, restart])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getConsortium()
  }, [])

  return (
    <div className=" min-h-full md:min-h-screen m-[50px] max-w-[1100px] mx-auto px-6">
      <div className=" flex text-[28px] font-bold text-blueDark mt-8 sm:mt-16 mb-16">
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          <div className=" h-[30px] mr-5">
            <img src={'/assets/icons/left-arrow.svg'} />
          </div>
        </button>
        <h2>Events</h2>
      </div>
      <div className=" mt-6">
        {notification?.map((not, i) => (
          <Accordion
            title={not.subject}
            index={i.toString()}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            key={not._id}
          >
            {not.description}
          </Accordion>
        ))}
      </div>
      <button
        className="bg-blueDark disabled:opacity-60 text-white text-xl absolute bottom-32 md:bottom-16 w-80 sm:w-60 h-12 rounded-lg block md:mt-8 sm:right-16 xl:right-32 2xl:right-80"
        onClick={() => {
          setModal(true)
        }}
      >
        Add new event
      </button>
      <WhiteModal
        isOpen={modal}
        toggle={() => {
          setModal(false)
        }}
      >
        <div className="px-4 -my-3">
          <h3 className="font-bold text-xl text-blueDark text-start">Add New Event</h3>
          <form
            onSubmit={handleSubmit(customSubmit)}
            className=" text-center"
          >
            <div>
              <input
                className="w-[250px] sm:w-[370px] h-11 mx-4 mt-4 rounded-lg border border-blueDark p-2 placeholder:italic placeholder:text-grey"
                placeholder="Subject"
                autoComplete="off"
                {...register('subject', {
                  required: true,
                })}
              />
            </div>
            <div>
              <textarea
                className="w-[250px] sm:w-[370px] h-36 mx-4 mt-3 rounded-lg border border-blueDark p-2 placeholder:italic placeholder:text-grey"
                placeholder="Description"
                autoComplete="off"
                {...register('description', {
                  required: true,
                })}
              />
            </div>
            <button
              type="submit"
              className="bg-blueDark disabled:opacity-60 text-white text-xl w-60 h-10 rounded-lg block mx-auto my-2"
              disabled={!isDirty || !isValid}
            >
              {loading ? <PulseLoader color="white" /> : 'Add new event'}
            </button>
          </form>
        </div>
      </WhiteModal>
      <BlueModal isOpen={modalOk}>
        <p>Your notification has been sent</p>
        <button
          onClick={() => {
            setModalOk(false)
          }}
          className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6"
        >
          OK
        </button>
      </BlueModal>
    </div>
  )
}

export default ConsortiumEvents
