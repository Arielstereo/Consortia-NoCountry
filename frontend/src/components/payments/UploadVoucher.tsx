import { PaymentMethodEnum } from '../../enums/paymentMethods.enum'

interface Props {
  image: string
  setImage: (image: string) => void
  setSelectedFile: React.Dispatch<React.SetStateAction<null | File>>
  paymentMethod: PaymentMethodEnum
}

const UploadVoucher = ({ image, setImage, setSelectedFile, paymentMethod }: Props) => {
  const id = `photoPicker-${new Date().getTime().toString()}`
  const changePicture = () => {
    const picker = document.getElementById(id)
    picker?.click()
  }

  const onImageChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedFile(file)
      if (typeof reader.result === 'string') {
        setImage(reader.result)
      } else {
        setImage('')
      }
    }
    reader.readAsDataURL(file)
  }
  return (
    <div>
      {image !== '' && (
        <div
          onClick={changePicture}
          className="right-0 top-0 w-[230px] h-[150px]
                      border-2 border-black bg-cover
                      rounded-lg animate-swingInTop"
          style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center center' }}
        ></div>
      )}
      {image === '' && paymentMethod === PaymentMethodEnum.Transfer && (
        <label
          onClick={changePicture}
          className="w-[180px] h-[44px]
                       disabled:bg-[rgba(49,103,1744,0.50)]
                       border-[1.5px] hover:bg-bluishBlack
                       hover:text-white text-bluishBlack
                       ease-out hover:font-bold border-bluishBlack
                       disabled:border-0 disabled:text-grey rounded-lg
                       px-6 flex justify-center items-center"
        >
          <span className="text-sm text-inter">Upload voucher</span>
        </label>
      )}
      {paymentMethod === PaymentMethodEnum.Cash && (
        <label
          className="w-[180px] h-[40px] bg-[rgba(49,103,1744,0.84)]
                            bg-[rgba(49,103,1744,0.50)] border-0 text-grey
                            rounded-lg px-6 flex justify-between items-center"
        >
          <span className="text-sm">Upload voucher</span>
        </label>
      )}
      <input
        id={id}
        hidden
        type="file"
        name="file"
        accept="image/*"
        onChange={onImageChanged}
      ></input>
    </div>
  )
}

export default UploadVoucher
