import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../../../../components/Container'
import PaymentsTable from '../../../../components/payments/PaymentsTable'
import { PaymentsValues } from '../../../../interfaces/paymentsInterfaces'
import getConsortiumPayments from '../../../../services/getConsortiumPayments'
import { changePaymentStatusService } from '../../../../services/changePaymentStatusService'
import DynamicStatusView from '../../../../components/status/DynamicStatusView'
import { useTitle } from '../../../../store/title'
import getConsortiumService from '../../../../services/getConsortiumService'

const ConsortiumPayments = () => {
  const [data, setData] = useState<PaymentsValues[]>([])
  const [dataToCompare, setDataToCompare] = useState<PaymentsValues[]>([])
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [errorGetPayments, setErrorGetPayments] = useState(false)
  const [isDataModified, setIsDataModified] = useState(false)
  const [isPaymentsViewExit, setIsPaymentsViewExit] = useState(false)
  const [loadingSaveChanges, setLoadingSaveChanges] = useState(false)
  const [errorSaveChanges, setErrorSaveChanges] = useState(false)
  const [successSaveChanges, setSuccessSaveChanges] = useState(false)
  const [member, setMember] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const setTitle = useTitle((state) => state.setTitle)

  const getConsortium = async () => {
    setTitle('Consortium')
    if (id) {
      const consortium = await getConsortiumService(id)
      setTitle(consortium.address)
    }
  }

  useEffect(() => {
    setLoadingPayments(true)
    getPayments()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getConsortium()
  }, [])

  const getPayments = () => {
    if (id) {
      getConsortiumPayments(id)
        .then((response) => {
          if (!Array.isArray(data)) {
            setErrorGetPayments(true)
            console.log('ERROR: ', response)
            return
          }
          setData(response)
          setDataToCompare(response)
          setLoadingPayments(false)
        })
        .catch((error) => {
          console.log(error)
          setErrorGetPayments(true)
          setLoadingPayments(false)
        })
    }
  }

  const saveChanges = () => {
    handleLoadingSaveChanges()
    const paymentsWithChangedStatus = getPaymentsWithChangedStatus()
    const promises = paymentsWithChangedStatus.map(async (payment) => {
      return await changePaymentStatusService(payment._id, payment.pStatus)
    })

    Promise.all(promises)
      .then((results) => {
        const isAnyRequestFailed = results.some((result) => !result.ok)
        if (isAnyRequestFailed) {
          handleErrorSaveChanges()
        } else {
          handleSuccessSaveChanges()
        }
      })
      .catch((error) => {
        console.log(error)
        handleErrorSaveChanges()
      })
  }

  const getPaymentsWithChangedStatus = () => {
    const paymentsWithChangedStatus: PaymentsValues[] = []
    data.forEach((item) => {
      const sameIdItem = dataToCompare.find((itemToCompare) => item._id === itemToCompare._id)
      if (sameIdItem?.pStatus !== item.pStatus) {
        paymentsWithChangedStatus.push(item)
      }
    })
    return paymentsWithChangedStatus
  }

  const goToTop = () => {
    if (ref.current) {
      ref.current?.scrollIntoView()
    }
  }

  const handleLoadingSaveChanges = () => {
    goToTop()
    setIsPaymentsViewExit(true)
    setTimeout(() => {
      setLoadingSaveChanges(false)
    }, 400)
  }

  const handleSuccessSaveChanges = () => {
    setLoadingSaveChanges(false)
    setSuccessSaveChanges(true)
    setTimeout(() => {
      resetValues()
      setLoadingPayments(true)
      getPayments()
    }, 2000)
  }

  const handleErrorSaveChanges = () => {
    setLoadingSaveChanges(false)
    setErrorSaveChanges(true)
    setTimeout(() => {
      resetValues()
    }, 3000)
  }

  const resetValues = () => {
    setSuccessSaveChanges(false)
    setErrorSaveChanges(false)
    setIsPaymentsViewExit(false)
  }

  const renderSearch = () => {
    return (
      <div className="flex mt-6">
        <input
          onChange={(e) => {
            setMember(e.target.value)
          }}
          value={member}
          type="text"
          autoComplete="off"
          className="border border-black
                   p-1 rounded-lg w-full h-10 lg:h-12
                   placeholder:italic placeholder:text-grey
                   px-5"
          placeholder="Search by member"
        />
        <i
          className="fa-solid fa-magnifying-glass
                    -ml-8 text-xl text-grey my-auto"
        ></i>
      </div>
    )
  }

  const renderPayments = () => {
    return (
      <div className="flex justify-center">
        <div
          className="relative flex flex-col
                          w-[67vw] min-w-[350px]
                          max-w-[1200px]"
        >
          {renderSearch()}
          <PaymentsTable
            filterValue={member}
            setData={setData}
            dataToCompare={dataToCompare}
            data={data}
            setIsDataModified={setIsDataModified}
          />
          <button
            onClick={() => {
              saveChanges()
            }}
            disabled={!isDataModified}
            className="absolute -bottom-24
                         md:right-0 text-lg bg-blueDark
                         text-white px-28 lg:px-12 py-3 rounded-lg
                         disabled:opacity-60"
          >
            Save changes
          </button>
        </div>
      </div>
    )
  }

  const renderLoadingPayments = () => {
    return (
      <div className="flex justify-center min-h-[680px] items-center">
        <div
          className="w-full h-full flex
                            justify-center items-center"
        >
          <div
            className="animate-fadeInRight flex
                         flex-col items-center gap-y-3"
          >
            <span
              className="w-[108px] h-[108px] border-[10px]
                                 border-dotted border-blueDark
                                 rounded-full inline-block relative
                                 box-border animate-rotation"
            ></span>
            <div className="font-bold text-blueDark text-center">
              <p>Loading Payments...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderErrorGetPayments = () => {
    return (
      <div className="flex justify-center min-h-[680px] items-center">
        <div
          className="w-full h-full flex
                            justify-center items-center"
        >
          <div
            className="animate-fadeInRight flex
                         flex-col items-center gap-y-3"
          >
            <img
              className="w-[108px] h-[108px]"
              src="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677383270/cancelar_vw30xs.png"
            />
            <div className="font-bold text-blueDark text-center">
              <p>
                Error retrieving payment data from the API/server.
                <br /> Please check your internet connection or try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full min-h-[780px] mb-0 pb-44 bg-white"
      ref={ref}
    >
      <Container>
        <div className="flex text-[25px] md:text-[28px] font-bold text-blueDark mt-8 md:mt-16 mb-8">
          <button
            onClick={() => {
              navigate(-1)
            }}
          >
            <div className=" h-[30px] mr-5">
              <img src={'/assets/icons/left-arrow.svg'} />
            </div>
          </button>
          <h2>Payments</h2>
        </div>
        {(loadingSaveChanges || successSaveChanges || errorSaveChanges) && (
          <div className="h-[780px]">
            <DynamicStatusView
              loading={loadingSaveChanges}
              loadingMessage={'Saving changes to payment statuses.<br />Please wait a moment...'}
              isSuccess={successSaveChanges}
              successMessage={'Success! Payment status changes<br /> have been saved.'}
              error={errorSaveChanges}
              errorMessage={
                'Some changes to the payment statuses<br /> were not saved correctly.<br /> Please check your internet connection and try again.'
              }
            />
          </div>
        )}
        <div className={isPaymentsViewExit ? 'animate-slideOutLeft' : ''}>
          {loadingPayments && renderLoadingPayments()}
          {!loadingPayments && errorGetPayments && renderErrorGetPayments()}
          {!loadingPayments && !errorGetPayments && renderPayments()}
        </div>
      </Container>
    </div>
  )
}

export default ConsortiumPayments
