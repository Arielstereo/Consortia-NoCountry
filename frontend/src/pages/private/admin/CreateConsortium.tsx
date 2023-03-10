import { useAuthStore } from '../../../store/auth'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { getAllAmenitiesService, createConsortiumService } from '../../../services/createConsortiumService'
import {
  AmenitiesListInt,
  ConsortiumCreationValues,
  ConsortiumStateValues,
  FormValues,
} from '../../../interfaces/amenitiesInterfaces'
import { PulseLoader } from 'react-spinners'
import BlueModal from '../../../components/modal/BlueModal'
import { useTitle } from '../../../store/title'
import ImageUploader from '../../../components/ImageUploader'
import { useNavigate } from 'react-router-dom'
import getUserByIdService from '../../../services/getUserByIdService'
import { IResponseUser } from '../../../interfaces/userInterfaces'
import { userStore } from '../../../store/user'

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

const defaultImage = 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/edit_lgdzbk.png'

const CreateConsortium = ({ setMenu }: Props) => {
  const userId = useAuthStore((state) => state.id)
  const [image, setImage] = useState<string | undefined>(defaultImage)

  const navigate = useNavigate()
  const setUser = userStore((state) => state.setData)

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('Create consortium')

  // const setUser = userStore((state) => state.setData)

  // const setConsortium = useAuthStore((state) => state.setConsortium)

  const [state, setState] = useState<ConsortiumStateValues>({
    amenitiesList: [],
    openModal: false,
    load: false,
    message: 'Your Consortium has been created',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({ mode: 'onTouched' })

  useEffect(() => {
    (async () => {
      const amenitiesCont: AmenitiesListInt[] = []

      const newOptions: [{ name: string, _id: string }] = await getAllAmenitiesService()

      // const res = (await getUserByIdService(userId)) as IResponseUser

      // setUser(res.user)

      newOptions.forEach((option) => {
        amenitiesCont.push({ value: option.name, label: option.name, id: option._id })
      })

      setState({ ...state, amenitiesList: amenitiesCont })
    })().catch((error) => {
      console.log(error)
    })
  }, [])

  const getUser = async () => {
    try {
      const res = (await getUserByIdService(userId)) as IResponseUser
      setUser(res.user)
    } catch (error) {
      console.log('error')
    }
  }

  const customSubmit = async (data: FormValues) => {
    try {
      setState({ ...state, load: true })
      const amenitieParsedValues = data.amenities.map((amenity) => amenity.id)
      const consortiumInfo: ConsortiumCreationValues = {
        admin: userId,
        ...data,
        amenities: amenitieParsedValues,
        img: image,
      }
      console.log(consortiumInfo)
      const response = await createConsortiumService(consortiumInfo)
      // const userConsortiumValues: [{ _id: string | undefined; address: string | undefined }] = [
      //   { _id: response.data?._id, address: data.address },
      // ]
      // setConsortium(userConsortiumValues)
      console.log(response)
      setState({ ...state, openModal: true, load: false })
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUser()
    } catch (error) {
      setState({
        ...state,
        openModal: true,
        message: 'An error has occurred, please try again later or make sure that you have admin privileges',
        load: false,
      })
      console.log(error)
    }
  }

  const preset = process.env.VITE_APP_PRESET_EDIT_CONSORTIUMS_PHOTOS

  return (
    <>
      <BlueModal isOpen={state.openModal}>
        <p>{state.message}</p>
        <button
          onClick={() => {
            setState({ ...state, openModal: false })
            navigate('/admin', { state: { show: 'My consortiums' } })
          }}
          className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6"
        >
          OK
        </button>
      </BlueModal>
      {/* {(errors.name?.type ||
        errors.address?.type ||
        errors.amenities?.type ||
        errors.floor?.type ||
        errors.apt?.type ||
        errors.amenities?.type) === 'required' && (
        <p className="absolute w-full top-28 md:top-20 pl-2 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
          Complete all required fields
        </p>
      )}
      {(errors.floor?.type === 'max' || errors.floor?.type === 'min') && (
        <p className="absolute w-full top-28 md:top-20 pl-2 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
          The number of floors is not acceptable, please try with a value between 1 and 100
        </p>
      )}
      {(errors.apt?.type === 'max' || errors.apt?.type === 'min') && (
        <p className="absolute w-full top-28 md:top-20 pl-2 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
          The number of apartments is not acceptable, please try with a value between 1 and 1000
        </p>
      )} */}

      <section className="pb-32">
        <div className=" w-full sm:mt-10 justify-around items-center">
          <div className="items-center sm:self-start">
            <div className=" hidden sm:flex gap-x-6 text-blueDark font-bold text-xl items-center">
              <button
                className=""
                onClick={() => {
                  setMenu('My consortiums')
                }}
              >
                <div className="flex flex-col w-[11.25px] h-[22.5px]">
                  <img src={'../../assets/icons/left-arrow.svg'} />
                </div>
              </button>
              <h3>Create Consortium</h3>
            </div>
            <button
              className=""
              onClick={() => {
                setMenu('My consortiums')
              }}
            >
              <div className="absolute left-4 w-[11.25px] h-[22.5px] sm:hidden">
                <img src={'../../assets/icons/left-arrow.svg'} />
              </div>
            </button>
            {/* <img
              className="rounded-md mt-4 sm:mt-10 sm:ml-10 border-2 border-black"
              src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677111896/bild-sky_owpyai.png"
              alt=""
            /> */}
          </div>
          <div className=" px-4 mt-16 ">
            <form
              className=" sm:flex justify-around"
              onSubmit={handleSubmit(customSubmit)}
            >
              <div
                className=" sm:w-[35%] mx-auto overflow-hidden relative
                               items-center flex mb-10 max-w-[270px] max-h-[160px] border"
              >
                <ImageUploader
                  setImage={setImage}
                  image={image}
                  preset={preset}
                  width={270}
                  height={160}
                />
              </div>
              <div className="sm:w-[45%] mx-auto">
                <input
                  className={`border-2 ${
                    !errors.name ? 'border-blueDark' : 'border-red'
                  } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-white focus:outline-none text-lg`}
                  type="text"
                  autoComplete="off"
                  placeholder="Name"
                  {...register('name', {
                    required: true,
                  })}
                />
                <input
                  className={`border-2 ${
                    !errors.address ? 'border-blueDark' : 'border-red'
                  } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-white focus:outline-none text-lg`}
                  type="text"
                  autoComplete="off"
                  placeholder="Address"
                  {...register('address', {
                    required: true,
                  })}
                />
                <input
                  className={`border-2 ${
                    !errors.floor ? 'border-blueDark' : 'border-red'
                  } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-white focus:outline-none text-lg`}
                  type="number"
                  autoComplete="off"
                  placeholder="Floors"
                  {...register('floor', {
                    required: true,
                    max: 100,
                    min: 1,
                  })}
                />
                <input
                  className={`border-2 ${
                    !errors.apt ? 'border-blueDark' : 'border-red'
                  } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-white focus:outline-none text-lg`}
                  type="number"
                  autoComplete="off"
                  placeholder="Units"
                  {...register('apt', {
                    required: true,
                    max: 1000,
                    min: 1,
                  })}
                />
                <Controller
                  control={control}
                  name="amenities"
                  rules={{ required: true }}
                  render={({ field: { value, name, onChange } }) => (
                    <Select
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                        }),
                      }}
                      onChange={onChange}
                      options={state.amenitiesList}
                      isMulti={true}
                      value={value}
                      name={name}
                    />
                  )}
                />
                <button
                  disabled={!isDirty || !isValid || state.load}
                  className="w-full mt-10 disabled:bg-gray-500 text-center text-white rounded-md px-10 py-3 bg-blueDark"
                  type="submit"
                >
                  {state.load ? <PulseLoader color="white" /> : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
export default CreateConsortium
