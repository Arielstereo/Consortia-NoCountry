import { useState } from 'react'
import DynamicStatusView from '../../../components/status/DynamicStatusView'
import UploadVoucher from '../../../components/payments/UploadVoucher'
import { PaymentMethodEnum } from '../../../enums/paymentMethods.enum'
import { PaymentData } from '../../../interfaces/paymentsInterfaces'
import { uploadImageService } from '../../../services/cloudinary/uploadImageService'
import createPaymentService from '../../../services/createPaymentService'
import { userStore } from '../../../store/user'
import { isValidAmountFormat } from '../../../utils/validationUtils'

interface Props {
  setIsCreateViewOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsCreatedPayment: React.Dispatch<React.SetStateAction<boolean>>
}

const UserCreatePayments = ({ setIsCreateViewOpen, setIsCreatedPayment }: Props) => {
  const user = userStore((state) => state.userData)
  const [file, setSelectedFile] = useState<null | File>(null)
  const [payment, setPayment] = useState({
    amount: '',
    note: '',
    paymentMethod: PaymentMethodEnum.Transfer,
    image: '',
  })
  const [isPaymentViewExit, setIsPaymentViewExit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = target

    if (name === 'paymentMethod' && value === PaymentMethodEnum.Cash) {
      setPayment({ ...payment, paymentMethod: PaymentMethodEnum.Cash, image: '' })
      setSelectedFile(null)
      return
    }

    if (name === 'amount') {
      const isValidAmount = isValidAmountFormat(value)
      if (!isValidAmount && payment.amount.length < 1) return
    }

    setPayment({ ...payment, [name]: value })
  }

  const setImage = (image: string) => {
    setPayment({ ...payment, image })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleLoading()

    try {
      let newPayment: PaymentData
      if (file === null) {
        newPayment = {
          note: payment.note,
          ammount: payment.amount,
          paymentMethod: payment.paymentMethod.toLowerCase(),
          image: '',
        }
      } else {
        const preset = process.env.VITE_APP_PRESET_VOUCHERS
        if (preset === undefined) {
          console.log('Preset vouchers is not defined.')
          return
        }
        const imageUploadResponse = await uploadImageService({ file, preset })
        newPayment = {
          note: payment.note,
          ammount: payment.amount,
          paymentMethod: payment.paymentMethod.toLowerCase(),
          image: imageUploadResponse.url,
        }
      }

      console.log('envio')

      await createPayment(newPayment)
    } catch (err) {
      handleError()
    }
  }

  const createPayment = async (newPayment: PaymentData): Promise<void> => {
    try {
      const resp = await createPaymentService(newPayment)
      if (!resp.ok) {
        handleError()
      } else {
        handleSuccess()
      }
    } catch (error) {
      console.log(error)
      handleError()
    }
  }

  const handleSuccess = () => {
    setLoading(false)
    setIsSuccess(true)
    setTimeout(() => {
      resetValues()
      setIsCreatedPayment(true)
    }, 2000)
  }

  const handleLoading = () => {
    setIsPaymentViewExit(true)
    setTimeout(() => {
      setLoading(true)
    }, 400)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
    setTimeout(() => {
      resetValues()
    }, 3000)
  }

  const resetValues = () => {
    setPayment({ ...payment, amount: '', note: '', paymentMethod: PaymentMethodEnum.Transfer, image: '' })
    setSelectedFile(null)
    setIsSuccess(false)
    setError(false)
    setIsPaymentViewExit(false)
  }

  const isSubmitDisabled = () => {
    if (payment.paymentMethod === PaymentMethodEnum.Transfer) {
      if (payment.amount === '' || payment.note === '' || payment.image === '') return true
    }

    if (payment.paymentMethod === PaymentMethodEnum.Cash) {
      if (payment.amount === '' || payment.note === '') return true
    }

    return false
  }

  return (
    <div className="overflow-hidden min-h-[560px] md:h-[560px] pb-12 md:pb-0">
      {(loading || error || isSuccess) && (
        <div className="h-[560px]">
          <DynamicStatusView
            loading={loading}
            loadingMessage={'Please wait while we save <br />your payment information...'}
            isSuccess={isSuccess}
            successMessage={'Success! Your payment <br />has been saved.'}
            error={error}
            errorMessage={'The payment could not be processed. <br />Please try again later.'}
          />
        </div>
      )}

      <div className={isPaymentViewExit ? 'animate-slideOutLeft' : ''}>
        <div className="w-full pl-11 pt-11 pb-5">
          <div
            className="flex gap-x-6 text-blueDark
                            font-bold text-xl items-center"
          >
            <button
              className=""
              onClick={() => {
                setIsCreateViewOpen(false)
              }}
            >
              <div className="fex flex-col w-[11.25px] h-[22.5px]">
                <img src={'../../assets/icons/left-arrow.svg'} />
              </div>
            </button>
            <h3>Attach payment</h3>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full px-14 md:px-[5vw] mt-10"
        >
          <div className="flex flex-row justify-between w-full">
            <div className="md:max-w-[363px] w-full">
              <div
                className="w-full h-[40px] rounded-lg
                                px-4 pt-2 pb-2.5 text-sm
                                text-black font-normal
                                border-[1.5px] border-bluishBlack
                                mb-7 bg-white"
              >
                {user?.apt && !isNaN(parseInt(user?.apt))
                  ? `${parseInt(user?.apt)} | Prop.: ${user?.lastname ?? ''}`
                  : `Prop.: ${user?.lastname ?? ''}`}
              </div>

              <div className={'md:hidden w-full items-center pb-7'}>
                <div
                  className={`md:pl-4 flex flex-col gap-y-8 w-full ${
                    payment.image !== '' ? 'h-full justify-center' : 'gap-y-4'
                  }`}
                >
                  <select
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    name={'paymentMethod'}
                    value={payment.paymentMethod}
                    className="w-full h-[40px] rounded-lg
                              px-4 pt-2 pb-2.5 text-sm
                              text-grey italic font-normal
                              border-[1.5px] border-bluishBlack"
                  >
                    <option value={PaymentMethodEnum.Transfer}>Transfer</option>
                    <option value={PaymentMethodEnum.Cash}>Cash</option>
                  </select>
                  <div className="h-full text-sm flex flex-col items-center">
                    <div className="w-[180px] py-3 text-bluishBlack font-bold">Attach voucher</div>
                    <UploadVoucher
                      image={payment.image}
                      setImage={setImage}
                      setSelectedFile={setSelectedFile}
                      paymentMethod={payment.paymentMethod}
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[40px] mb-7">
                {payment.amount !== '' && <span className="absolute left-2 top-2 font-bold">$</span>}
                <input
                  maxLength={10}
                  name={'amount'}
                  onChange={handleChange}
                  type={'text'}
                  placeholder={'Amount'}
                  value={payment.amount}
                  className="w-full h-[40px] rounded-lg
                              px-5 pt-2 pb-2.5 placeholder:text-sm
                              placeholder:text-grey placeholder:italic
                              border-[1.5px] border-bluishBlack"
                />
              </div>
              <textarea
                maxLength={255}
                name={'note'}
                onChange={handleChange}
                placeholder={'Note'}
                value={payment.note}
                className="w-full h-[110px] rounded-lg px-4 pt-2
                            placeholder:text-sm placeholder:text-grey
                            placeholder:italic border-[1.5px]
                            border-bluishBlack mb-7"
              />
            </div>
            <div className={'hidden md:flex w-[280px] items-center pb-7'}>
              <div
                className={`pl-4 flex flex-col gap-y-8 w-full ${
                  payment.image !== '' ? 'h-full justify-center' : 'gap-y-4'
                }`}
              >
                <select
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  name={'paymentMethod'}
                  value={payment.paymentMethod}
                  className="w-full h-[40px] rounded-lg
                              px-4 pt-2 pb-2.5 text-sm
                              text-grey italic font-normal
                              border-[1.5px] border-bluishBlack"
                >
                  <option value={PaymentMethodEnum.Transfer}>Transfer</option>
                  <option value={PaymentMethodEnum.Cash}>Cash</option>
                </select>
                <div className="h-full text-sm flex flex-col items-center">
                  <div className="w-[180px] py-3 text-bluishBlack font-bold">Attach voucher</div>
                  <UploadVoucher
                    image={payment.image}
                    setImage={setImage}
                    setSelectedFile={setSelectedFile}
                    paymentMethod={payment.paymentMethod}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={'w-full flex justify-center md:mt-[28px]'}>
            <input
              disabled={isSubmitDisabled()}
              type={'submit'}
              className="text-lg text-white py-2
                          bg-blueDark disabled:opacity-40
                          disabled:border-0 rounded-lg
                          border-2 border-black w-[363px]"
              value={'Report payment'}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserCreatePayments
