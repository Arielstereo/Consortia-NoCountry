import { useForm, SubmitHandler } from 'react-hook-form'
import BlueModal from '../../components/modal/BlueModal'
import { UserProfile } from '../../interfaces/userInterfaces'
import editProfileService from '../../services/editProfileService'
import { userStore } from '../../store/user'

interface EditProfileProps {
  preloadValues: UserProfile
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditProfile = ({ preloadValues, setEdit }: EditProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    defaultValues: preloadValues,
  })

  const setData = userStore((state) => state.setData)

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    const resp = await editProfileService(data)

    if (resp?.data.ok) {
      setData(resp.data.user)
    }
  }
  const image = userStore((state) => state.userData?.img)

  return (
    <>
      <BlueModal isOpen={isSubmitted}>
        Your profile has been updated!
        <button
          className="bg-blue text-white text-center text-lg w-24 h-8 rounded-2xl bg-whit block mx-auto mt-6 shadow-xl hover:bg-blue hover:text-white"
          onClick={() => {
            setEdit(false)
          }}
        >
          Accept
        </button>
      </BlueModal>
      <div>
        <div className="flex font-bold text-xl text-blueDark ml-11 mt-7">
          <div className="flex gap-x-6 text-blueDark font-bold text-xl items-center">
            <button
              className=""
              onClick={() => {
                setEdit(false)
              }}
            >
              <div className="fex flex-col w-[11.25px] h-[22.5px]">
                <img src={'../../assets/icons/left-arrow.svg'} />
              </div>
            </button>
            <h3>Edit Profile</h3>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid px-6 justify-center"
        >
          <div className=" h-[130px] w-[130px] overflow-hidden border-2 border-black rounded-lg relative mx-auto my-6">
            <img
              className="object-cover h-[130px] min-w-full"
              src={image}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className=" p-3 grid">
              <label className="text-lg text-blueDark font-bold">Name</label>
              <input
                className="w-[300px] rounded-lg border-2 border-blueDark p-2"
                {...register('name', {
                  required: true,
                })}
              />
              {errors.name && <small>The field cannot be empty</small>}
            </div>
            <div className="p-3 grid">
              <label className="text-lg text-blueDark font-bold">Last name</label>
              <input
                className="w-[300px] rounded-lg border-2 border-blueDark p-2"
                {...register('lastname', {
                  required: true,
                })}
              />
              {errors.lastname && <small>The field cannot be empty</small>}
            </div>
            <div className="p-3 grid">
              <label className="text-lg text-blueDark font-bold">Phone</label>
              <input
                className="w-[300px] rounded-lg border-2 border-blueDark p-2"
                {...register('phone', {
                  minLength: 10,
                })}
              />
              {errors.phone && <small>The field cannot be empty and must be a number</small>}
            </div>

            <div className="p-3 grid">
              <label className="text-lg text-blueDark font-bold">Profile image</label>
              <input
                className="w-[300px] rounded-lg border-2 border-blueDark p-2"
                {...register('img', {
                  required: true,
                })}
              />
              {errors.img && <small>The field cannot be empty</small>}
            </div>
            {preloadValues.role !== 'admin' && (
              <div className="p-3 grid">
                <label className="text-lg text-blueDark font-bold">Apt</label>
                <input
                  className="w-[300px] rounded-lg border-2 border-blueDark p-2"
                  {...register('apt', {
                    required: true,
                  })}
                />
                {errors.apt && <small>The field cannot be empty</small>}
              </div>
            )}
            <div className="p-3 flex justify-center items-center pb-[7px] pt-[30px]">
              <button
                type="submit"
                className="bg-blueDark rounded-lg w-[198px] h-[50px] text-white text-lg leading-6"
              >
                {isSubmitting ? (
                  <div
                    role="status"
                    className="flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditProfile
