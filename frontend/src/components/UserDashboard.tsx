import Container from './Container'
import { useState } from 'react'
import HeroUser from './HeroUser'
import UserInformation from '../pages/private/user/UserInformation'
import UserDocuments from '../pages/private/user/UserDocuments'
import UserAmenities from '../pages/private/user/UserAmenities'
import UserPayments from '../pages/private/user/UserPayments'
import UserOrders from '../pages/private/user/UserOrders'
import UserVoting from '../pages/private/user/UserVoting'

const UserDashboard = () => {
  const [menu, setMenu] = useState('information')
  const [imageUrl, setImageUrl] = useState('/assets/background/Information.jpg')

  return (
    <HeroUser imageUrl={imageUrl}>
      <Container>
        <div className="flex h-[560px] pt-12 justify-center">
          <div className="bg-blueUser bg-opacity-70 min-w-[268px] border-2 border-black rounded-lg pl-7 pr-2">
            <div className="flex mt-10 mb-6 ">
              <div className="rounded-full h-[90px] w-[90px] overflow-hidden border-2 border-black relative">
                <img
                  className="object-cover h-[90px] min-w-full"
                  src="/assets/defaultUser.svg"
                  alt=""
                />
              </div>
              <div className="text-base text-center mx-auto">
                <p className=" font-bold">Monica Rivera</p>
                <p>Ownew</p>
              </div>
            </div>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'information' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('information')
                setImageUrl('/assets/background/Information.jpg')
              }}
            >
              Information
            </p>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'documents' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('documents')
                setImageUrl('/assets/background/Documents.jpg')
              }}
            >
              Documents
            </p>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'amenities' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('amenities')
                setImageUrl('')
              }}
            >
              Amenities
            </p>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'payments' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('payments')
                setImageUrl('/assets/background/Payments.jpg')
              }}
            >
              Payments
            </p>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'orders' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('orders')
                setImageUrl('')
              }}
            >
              Orders
            </p>
            <p
              className={`py-[15px] cursor-pointer ${menu === 'voting' ? 'font-bold' : ''}`}
              onClick={() => {
                setMenu('voting')
                setImageUrl('')
              }}
            >
              Voting
            </p>
          </div>
          <div className="bg-blue bg-opacity-20 w-[880px] border border-black rounded-lg">
            {menu === 'information' && <UserInformation />}
            {menu === 'documents' && <UserDocuments />}
            {menu === 'amenities' && <UserAmenities />}
            {menu === 'payments' && <UserPayments />}
            {menu === 'orders' && <UserOrders />}
            {menu === 'voting' && <UserVoting />}
          </div>
        </div>
      </Container>
    </HeroUser>
  )
}

export default UserDashboard
