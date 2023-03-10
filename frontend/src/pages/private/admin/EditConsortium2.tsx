import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import Container from '../../../components/Container'
import Controller from '../../../components/Controller'
import ImageUploader from '../../../components/ImageUploader'
import BlueModal from '../../../components/modal/BlueModal'
import Error from '../../../components/status/Error'
import Loading from '../../../components/status/Loading'
import { Amenity, EditConsortium } from '../../../interfaces/amenitiesInterfaces'
import { OptionValues } from '../../../interfaces/optionInterfaces'
import { IResponseUser } from '../../../interfaces/userInterfaces'
import { editConsortiumService, getAllAmenitiesService } from '../../../services/createConsortiumService'
import { deleteConsortiumService } from '../../../services/deleteConsortiumService'
import getConsortiumService from '../../../services/getConsortiumService'
import getUserByIdService from '../../../services/getUserByIdService'
import { useAuthStore } from '../../../store/auth'
import { userStore } from '../../../store/user'
import { isValidApt } from '../../../utils/validationUtils'
import { useTitle } from '../../../store/title'

const EditConsortium2 = () => {
  const userId = useAuthStore((state) => state.id)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [consortium, setConsortium] = useState({
    name: '',
    address: '',
    floor: '',
    apt: '',
  })
  const [errorGettingData, setErrorGettingData] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [isSavingData, setIsSavingData] = useState(false)
  const [allOptions, setAllOptions] = useState<OptionValues[]>([])
  const [selectedOptions, setSelectedOptions] = useState<OptionValues[]>([])
  const [image, setImage] = useState<string | undefined>('')
  const [showModal, setShowModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

  const [deleteModal, setDeleteModal] = useState(false)
  const [okModal, setOkModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const defaultImage = 'https://res.cloudinary.com/dozwd1ssj/image/upload/v1677157941/edit_lgdzbk.png'
  const messageLoading = 'Loading Consortium...'
  const messageError = 'Sorry, there was an error retrieving the data from the server.<br /> Please try again later.'

  const setTitle = useTitle((state) => state.setTitle)

  const getConsortium = async (idCons: string) => {
    setTitle('Consortium')
    const consort = await getConsortiumService(idCons)
    setTitle(consort.address)
    setConsortium({
      ...consortium,
      name: consort.name,
      address: consort.address,
      floor: consort.floor,
      apt: consort.apt,
    })

    if (!consort.img) {
      setImage(defaultImage)
    } else {
      setImage(consort.img)
    }

    const amenitiesDefault: OptionValues[] = []
    consort.amenities.forEach((option: Amenity) => {
      amenitiesDefault.push({ value: option.name, label: option.name, id: option._id })
    })
    setSelectedOptions(amenitiesDefault)
    setLoadingData(false)
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    if (name === 'floor' || name === 'apt') {
      const isValidAptFormat = isValidApt(value)
      if (!isValidAptFormat) return
    }

    setConsortium({ ...consortium, [name]: value })
  }

  useEffect(() => {
    setLoadingData(true)
    if (id) {
      getConsortium(id)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      ;(async () => {
        const amenitiesCont: OptionValues[] = []

        const newOptions: Amenity[] = await getAllAmenitiesService()

        newOptions.forEach((option) => {
          amenitiesCont.push({ value: option.name, label: option.name, id: option._id })
        })

        setAllOptions(amenitiesCont)
      })().catch((error) => {
        console.log(error)
        setLoadingData(false)
        setErrorGettingData(true)
      })
    }
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id) {
      try {
        setIsSavingData(true)
        const amenitieParsedValues = selectedOptions.map((amenity) => amenity.id)

        if (consortium === undefined) return

        if (image === undefined) return

        const consortiumToEdit: EditConsortium = {
          name: consortium.name,
          address: consortium.address,
          floor: Number.parseInt(consortium.floor),
          apt: Number.parseInt(consortium.apt),
          amenities: amenitieParsedValues,
          img: image,
        }

        editConsortiumService(id, userId, consortiumToEdit)
          .then((response) => {
            console.log(response)
            setModalMsg('Your Consortium has been updated')
            setShowModal(true)
            setIsSavingData(false)
            getUser()
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
            setModalMsg('An error has occurred, please try again later or make sure that you have admin privileges')
            setShowModal(true)
            setIsSavingData(false)
          })
      } catch (error) {
        setModalMsg('An error has occurred, please try again later or make sure that you have admin privileges')
        setShowModal(true)
        setIsSavingData(false)

        console.log(error)
      }
    }
  }

  const setUser = userStore((state) => state.setData)

  const getUser = async () => {
    try {
      const res = (await getUserByIdService(userId)) as IResponseUser
      setUser(res.user)
    } catch (error) {
      console.log('error')
    }
  }

  const handleDelete = async () => {
    if (id) {
      try {
        setLoading(true)
        await deleteConsortiumService(id, userId)
        setMsg('The consortium has benn deleted')
        setLoading(false)
        setDeleteModal(false)
        setOkModal(true)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getUser()
      } catch (error) {
        setLoading(false)
        setMsg('An error ocurred')
      }
    }
  }

  const preset = process.env.VITE_APP_PRESET_EDIT_CONSORTIUMS_PHOTOS

  return (
    <>
      <BlueModal isOpen={showModal}>
        <h4>{modalMsg}</h4>
        <button
          onClick={() => {
            setShowModal(false)
            navigate('/admin', { state: { show: 'My consortiums' } })
          }}
          className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6"
        >
          OK
        </button>
      </BlueModal>
      <section className="pb-32">
        <Container>
          <div className=''>
            <div
              className="flex font-bold text-xl
                               text-blueDark mt-10
                               items-center justify-center
                               sm:justify-start mb-4"
            >
              <button
                onClick={() => {
                  navigate(-1)
                }}
              >
                <div className=" h-[30px] mr-5">
                  <img src={'/assets/icons/left-arrow.svg'} />
                </div>
              </button>
              <h3>Edit Consortium</h3>
            </div>
            {errorGettingData && (
              <div className="h-[500px] flex items-center justify-center">
                <Error message={messageError} />
              </div>
            )}
            {loadingData && (
              <div className="h-[500px] flex items-center justify-center">
                <Loading message={messageLoading} />
              </div>
            )}
            {!errorGettingData && !loadingData && (
              <div
                className="flex flex-col xl:flex-row
                               w-full mt-16 justify-around
                               items-center"
              >
                <div
                  className="overflow-hidden relative
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
                <div>
                  <form
                    className=" max-w-[95%] mx-auto grid grid-flow-row md:w-[30rem]"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-flow-col grid-rows-2 gap-x-2 sm:gap-x-10">
                      <div className="relative">
                        <h5 className=" font-bold text-lg text-blueDark text-start">Name</h5>
                        <input
                          className={`border-2 ${
                            consortium.name !== '' ? 'border-blueDark' : 'border-red'
                          } rounded-lg h-12 px-4 mb-8 w-full 
                        placeholder:italic placeholder:text-grey
                        bg-white focus:outline-none text-lg`}
                          type="text"
                          autoComplete="off"
                          placeholder="Name"
                          name={'name'}
                          value={consortium?.name}
                          onChange={handleChange}
                        />
                        {consortium.name === '' && (
                          <small className="absolute bottom-2 left-5 text-red">The name cannot be empty</small>
                        )}
                      </div>
                      <div className="relative">
                        <h5 className="font-bold text-lg text-blueDark text-start">Address</h5>
                        <input
                          className={`border-2 ${
                            consortium.address !== '' ? 'border-blueDark' : 'border-red'
                          } rounded-lg h-12 px-4 mb-8 w-full
                          placeholder:italic placeholder:text-grey
                          bg-white focus:outline-none text-lg`}
                          type="text"
                          autoComplete="off"
                          placeholder="Address"
                          name={'address'}
                          value={consortium?.address}
                          onChange={handleChange}
                        />
                        {consortium.address === '' && (
                          <small className="absolute bottom-2 left-5 text-red">The address cannot be empty</small>
                        )}
                      </div>
                      <div className="relative">
                        <h5 className=" font-bold text-lg text-blueDark text-start">Floors</h5>
                        <input
                          className={`border-2 ${
                            consortium.floor !== '' ? 'border-blueDark' : 'border-red'
                          } rounded-lg h-12 px-4 mb-8 w-full
                          placeholder:italic placeholder:text-grey
                          bg-white focus:outline-none text-lg`}
                          type="text"
                          autoComplete="off"
                          placeholder="Floors"
                          value={consortium?.floor}
                          name={'floor'}
                          onChange={handleChange}
                        />
                        {consortium.floor === '' && (
                          <small className="absolute bottom-2 left-5 text-red">The floor cannot be empty</small>
                        )}
                      </div>
                      <div className="relative">
                        <h5 className=" font-bold text-lg text-blueDark text-start">Units</h5>
                        <input
                          className={`border-2 ${
                            consortium.apt !== '' ? 'border-blueDark' : 'border-red'
                          } rounded-lg h-12 px-4 mb-8 w-full
                          placeholder:italic placeholder:text-grey
                          bg-white focus:outline-none text-lg`}
                          type="text"
                          autoComplete="off"
                          placeholder="Units"
                          name={'apt'}
                          value={consortium?.apt}
                          onChange={handleChange}
                        />
                        {consortium.apt === '' && (
                          <small className="absolute bottom-2 left-5 text-red">The apt cannot be empty</small>
                        )}
                      </div>
                    </div>
                    <h5 className=" font-bold text-lg text-blueDark text-start">Amenities</h5>
                    <Controller
                      allOptions={allOptions}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                    <button
                      disabled={
                        consortium.name === '' ||
                        consortium.address === '' ||
                        consortium.apt === '' ||
                        consortium.floor === ''
                      }
                      className="w-[250px] mt-10 disabled:bg-gray-500
                                 text-center text-white rounded-md px-10
                                py-3 bg-blueDark mx-auto sm:ml-auto sm:mr-0"
                      type="submit"
                    >
                      {isSavingData ? <PulseLoader color="white" /> : 'Save changes'}
                    </button>
                  </form>
                <button
                  className=" block mx-auto sm:ml-auto sm:mr-0  mt-10 text-center
            text-white rounded-md
            px-10 py-3 bg-blueDark"
                  onClick={() => {
                    setDeleteModal(true)
                  }}
                >
                  Delete Consortium
                </button>
                </div>
              </div>
            )}
          </div>
        </Container>
        <BlueModal isOpen={deleteModal}>
          <p>Are you sure to delete this consortium?</p>
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              handleDelete()
              setDeleteModal(false)
            }}
            className="bg-blue text-white text-lg w-20 rounded-2xl mt-6 mx-4 h-[29px]"
          >
            {loading ? <PulseLoader color="white" /> : 'YES'}
          </button>
          <button
            onClick={() => {
              setDeleteModal(false)
            }}
            className=" bg-blueDark text-white text-lg w-20 rounded-2xl mt-6 mx-4 border-[1.5px] border-blue h-[29px]"
          >
            NO
          </button>
        </BlueModal>
        <BlueModal isOpen={okModal}>
          <h4>{msg}</h4>
          <button
            onClick={() => {
              setOkModal(false)
              navigate('/admin', { state: { show: 'My consortiums' } })
            }}
            className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6"
          >
            OK
          </button>
        </BlueModal>
      </section>
    </>
  )
}

export default EditConsortium2
