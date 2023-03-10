import { useEffect, useState } from 'react'
import DetailModal from '../../../../components/modal/DetailsModal'
import Loading from '../../../../components/status/Loading'
import Error from '../../../../components/status/Error'
import { TitleComponents } from '../../../../components/TitleComponents'
import getUserPaymentsService from '../../../../services/getUserPaymentsService'
import { useAuthStore } from '../../../../store/auth'
import UserCreatePayments from '../UserCreatePayments'
import { UserPaymentsValues } from '../../../../interfaces/paymentsInterfaces'
import PaymentCard from './PaymentCard'
import { useTitle } from '../../../../store/title'

const UserPayments = () => {
  const [isCreateViewOpen, setIsCreateViewOpen] = useState(false)
  const [isCreatedPayment, setIsCreatedPayment] = useState(false)
  const [payments, setPayments] = useState<UserPaymentsValues[]>([])
  const [loadingPayments, setLoadingPayments] = useState(false)
  const [errorGetPayments, setErrorGetPayments] = useState(false)
  const userId = useAuthStore((state) => state.id)
  const [showModal, setShowModal] = useState(false)
  const [paymentData, setPaymentData] = useState<UserPaymentsValues>()

  const setTitle = useTitle((state) => state.setTitle)
  setTitle('My payments')

  const errorMessage =
    'Error retrieving payment data from the API/server. <br /> Please check your internet connection or try again later.'

  const loadingMessage = 'Loading payments...'

  useEffect(() => {
    setLoadingPayments(true)
    if (userId) {
      getPayments(userId)
    }
  }, [])

  useEffect(() => {
    if (isCreatedPayment && userId) {
      setIsCreatedPayment(false)
      setIsCreateViewOpen(false)
      setLoadingPayments(true)
      getPayments(userId)
    }
  }, [isCreatedPayment])

  const getPayments = (id: string) => {
    if (id) {
      getUserPaymentsService(id)
        .then((response) => {
          if (!Array.isArray(payments)) {
            setErrorGetPayments(true)
            console.log('ERROR: ', response)
            return
          }
          setPayments(response)
          setLoadingPayments(false)
        })
        .catch((error) => {
          console.log(error)
          setErrorGetPayments(true)
          setLoadingPayments(false)
        })
    }
  }

  const openDetailsModal = (payment: UserPaymentsValues) => {
    setPaymentData(payment)
    setShowModal(true)
  }

  const renderLoading = () => {
    return (
      <div className="h-[440px]">
        <Loading message={loadingMessage} />
      </div>
    )
  }

  const renderError = () => {
    return (
      <div className="h-[440px]">
        <Error message={errorMessage} />
      </div>
    )
  }

  const renderPayments = () => {
    return (
      <div>
        <div className="-translate-y-5 w-full flex justify-center">
          <div className="w-full ml-[10%]">
            {/* TODO: Put the search component back in the future after restructuring the payment model
            <SearchBar
              userType="user"
              searchIn="documents"/>
              */}
          </div>
        </div>
        <div className="w-full px-11 mb-5 overflow-y-auto">
          <div
            className="w-full h-[340px]
                    grid grid-cols-[repeat(auto-fill,220px)]
                    gap-x-10 gap-y-8
                    justify-center
                    overflow-y-auto
                    scrollPayments
                    "
          >
            {!Array.isArray(payments) || payments.length === 0 ? (
              <h3>There are no results to show.</h3>
            ) : (
              payments.map((payment) => (
                <PaymentCard
                  key={payment._id}
                  payment={payment}
                  openDetailsModal={openDetailsModal}
                />
              ))
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setIsCreateViewOpen(true)
          }}
          className="bg-blueDark text-white
                          text-xl w-[360px] h-10
                          rounded-lg block mx-auto"
        >
          Create new payment
        </button>
      </div>
    )
  }

  return (
    <>
      {showModal && (
        <DetailModal
          setModal={setShowModal}
          name={paymentData?.user.name}
          lastname={paymentData?.user.lastname}
          creationDate={paymentData?.creationDate}
          amount={paymentData?.ammount}
          note={paymentData?.note}
        />
      )}
      {isCreateViewOpen ? (
        <UserCreatePayments
          setIsCreateViewOpen={setIsCreateViewOpen}
          setIsCreatedPayment={setIsCreatedPayment}
        />
      ) : (
        <div className="relative">
          <TitleComponents title="Payments" />
          {loadingPayments && renderLoading()}
          {!loadingPayments && errorGetPayments && renderError()}
          {!loadingPayments && !errorGetPayments && renderPayments()}
        </div>
      )}
    </>
  )
}

export default UserPayments
