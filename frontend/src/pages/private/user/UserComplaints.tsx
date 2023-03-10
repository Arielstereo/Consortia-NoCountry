import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { PulseLoader } from 'react-spinners'
import { userStore } from '../../../store/user'
import UserComplaintService from '../../../services/UserComplaintService'
import BlueModal from '../../../components/modal/BlueModal'
import { useTitle } from '../../../store/title'

interface ComplaintForm {
  subject: string
  description: string
}

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

const UserComplaints = ({ setMenu }: Props) => {
  const [loading, setLoading] = useState(false)
  const [modalOk, setModalOk] = useState(false)

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('Complaints')

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<ComplaintForm>({ mode: 'onTouched' })

  const user = userStore((state) => state.userData)
  const adminEmail = user?.consortium?.find(() => true)?.admin.email
  const customSubmit: SubmitHandler<ComplaintForm> = async (data: ComplaintForm) => {
    const { subject, description } = data
    if (user) {
      const { apt, name, lastname } = user
      const dataMail = {
        name: `${name} ${lastname}`,
        apt,
        email: adminEmail,
        subject,
        message: description,
      }
      setLoading(true)
      await UserComplaintService(dataMail)
      setModalOk(true)
      setLoading(false)
      reset()
    }
  }

  return (
    <div>
      <h3 className=" text-[#002A61] text-center sm:text-start font-bold text-xl sm:ml-11 mt-7">New Complain</h3>
      <div className=" px-4 sm:px-14 py-4">
        <p className=" text-center sm:text-start">Complete the following form to create a complaint to the Admin.</p>
        <div className="">
          <form
            onSubmit={handleSubmit(customSubmit)}
            className=" text-center"
          >
            <div>
              <input
                className="w-[250px] sm:w-[370px] mx-4 mt-8 rounded-lg border-2 border-blueDark p-2 placeholder:italic placeholder:text-grey"
                placeholder="Subject"
                autoComplete="off"
                {...register('subject', {
                  required: true,
                })}
              />
            </div>
            <div>
              <textarea
                className="w-[250px] sm:w-[370px] h-36 mx-4 mt-8 rounded-lg border-2 border-blueDark p-2 placeholder:italic placeholder:text-grey"
                placeholder="Description"
                autoComplete="off"
                {...register('description', {
                  required: true,
                })}
              />
            </div>
            <button
              type="submit"
              className="bg-blueDark disabled:opacity-60 text-white text-xl w-60 h-12 rounded-2xl block mx-auto mt-8 mb-5"
              disabled={!isDirty || !isValid}
            >
              {loading ? <PulseLoader color="white" /> : 'Send'}
            </button>
          </form>
        </div>
      </div>
      <BlueModal isOpen={modalOk}>
        <p>Your complaint has been sent.</p>
        <button
          onClick={() => {
            setModalOk(false)
            setMenu('profile')
          }}
          className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6"
        >
          OK
        </button>
      </BlueModal>
    </div>
  )
}

export default UserComplaints
