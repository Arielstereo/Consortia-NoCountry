import { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Hero from '../components/Hero'
import WhatsappDialog from '../components/WhatsappDialog'
import { useAuthStore } from '../store/auth'

const Home = () => {
  const [show, setShow] = useState(false)
  const role = useAuthStore((state) => state.role)

  const check = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#002a61"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )

  return (
    <>
      <section className="hidden sm:inline bg-content bg-redLight w-full">
        {show && <WhatsappDialog setShow={setShow} />}
        <div className="relative drop-shadow-[0px_10px_7px_rgba(0,0,0,0.5)] z-10">
          <Hero imageUrl="https://res.cloudinary.com/dozwd1ssj/image/upload/v1676344015/Landing_h8moql.jpg">
            <Container>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-[600px] flex flex-col lg:flex-row justify-between">
                  <div className="relative animate-fadeInBottom text-blueDark">
                    <h1 className="text-[35px] lg:text-4.5xl font-bold py-2">
                      Your Ideal Software For
                      <br /> Consortia Management
                    </h1>
                    <div className="w-full flex justify-end">
                      <h2 className="text-[25px] lg:text-2.5xl py-3">
                        Keep good comunication
                        <br />
                        with your community.
                      </h2>
                    </div>
                    <div className="absolute -bottom-96 lg:bottom-12">
                      <button
                        onClick={() => {
                          setShow(true)
                        }}
                        className="flex items-center bg-[#00BB2D] rounded-2xl lg:rounded-full text-white text-xl font-bold gap-x-4 pl-4 pr-4 lg:pl-8 lg:pr-9 py-3 drop-shadow-[0px_5px_1px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:translate-x-1 hover:bg-[#34b7f1] hover:drop-shadow-[-3px_8px_1px_rgba(0,0,0,0.4)] transition duration:100 hover:scale-105"
                      >
                        <img src={'../assets/wsapp_logo.svg'} />
                        <span className="hidden lg:inline">Contact us!</span>
                      </button>
                    </div>
                  </div>
                  <div className="relative w-[580px] h-[535px] animate-fadeInRight mt-8 lg:mt-1">
                    <div className="absolute w-80 lg:w-[379px] lg:h-[281px] bg-white top-0 left-0 rounded-lg origin-top-left rotate-[-1.78deg] border-2 border-black drop-shadow-[0px_4px_1px_rgba(0,0,0,0.5)] transition ease-in-out delay-100 hover:-translate-y-10 hover:-translate-x-10 duration-200 overflow-hidden">
                      <img
                        src={'https://res.cloudinary.com/dozwd1ssj/image/upload/v1676391650/people2_fxkzjz.png'}
                        className="w-full"
                      />
                    </div>
                    <div className="absolute w-80 lg:w-[402px] lg:h-[299px] bg-white mt-40 lg:bottom-0 right-16 lg:right-8 rounded-lg origin-bottom-right rotate-[6.12deg] border-2 border-black drop-shadow-[0px_4px_1px_rgba(0,0,0,0.5)] transition ease-in-out delay-100 hover:-translate-y-10 hover:translate-x-10 duration-300 overflow-hidden">
                      <img
                        src={'https://res.cloudinary.com/dozwd1ssj/image/upload/v1676391639/people1_nmlpyq.png'}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <ul className="absolute mb-8 lg:mb-0 gap-4 md:gap-1 lg:gap-6 lg:px-20 -bottom-32 lg:bottom-0 translate-y-6 flex flex-row justify-between text-white text-2xl w-full font-light font-inter">
                  <li
                    className={
                      ' text-center mt-16 lg:mt-0 h-16 flex justify-center items-center bg-blue w-48 rounded-lg border-black drop-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] cursor-default hover:bg-[#34b7f1] hover:-translate-y-3 hover:drop-shadow-[0px_20px_8px_rgba(0,0,0,0.3)] transition ease-in-out delay-100 duration-200'
                    }
                  >
                    Administrate
                  </li>
                  <li
                    className={
                      ' text-center mt-32 lg:mt-0 h-16 flex justify-center items-center bg-grey w-48 rounded-lg border-black drop-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] cursor-default hover:bg-[#34b7f1] hover:-translate-y-3 hover:drop-shadow-[0px_20px_8px_rgba(0,0,0,0.3)] transition ease-in-out delay-100 duration-200'
                    }
                  >
                    Comunicate
                  </li>
                  <li
                    className={
                      ' text-center mt-48 lg:mt-0 h-16 flex justify-center items-center bg-blueDark w-48 rounded-lg border-black drop-shadow-[0px_3px_1px_rgba(0,0,0,0.5)] cursor-default hover:bg-[#34b7f1] hover:-translate-y-3 hover:drop-shadow-[0px_20px_8px_rgba(0,0,0,0.3)] transition ease-in-out delay-100 duration-200'
                    }
                  >
                    Make it easy!
                  </li>
                </ul>
              </div>
            </Container>
          </Hero>
        </div>

        <div className="w-full h-[725px]">
          <div
            className="h-full w-full bg-slate-800"
            style={{
              background:
                "linear-gradient(rgba(247, 225, 225,.35), rgba(247, 225, 225,.35)), url('https://res.cloudinary.com/dozwd1ssj/image/upload/v1676389907/night-city_phlesg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Container>
              <div className="w-full h-[725px] pt-36">
                <div className="w-full">
                  <h2 className="font-bold text-3xl text-blueDark">What&apos;s S.O.S Consortia?</h2>
                  <p className="text-2xl font-inter">
                    It&apos;s a software that provides the <b>easiest</b> way to manage the key information of you
                    consortium
                  </p>
                  <ul className="mt-12 flex justify-center gap-0 md:gap-4">
                    <li className="bg-white p-4 md:p-2 mt-1 rounded-md  flex items-center m-auto text-center border-[1px] border-[#b3b3b3] h-[80px]">
                      {check} Create a dashboard
                    </li>
                    <li className="bg-white p-4 md:p-2 mt-20 rounded-md  flex items-center m-auto text-center  border-[1px] border-[#b3b3b3] h-[80px]">
                      {check} Establishes rules of coexistence
                    </li>
                    <li className="bg-white p-4 md:p-2 mt-1 rounded-md  flex items-center m-auto text-center h-[80px]">
                      {check} Know the relevant data
                    </li>
                    <li className="bg-white p-4 md:p-2 mt-20 rounded-md  flex items-center m-auto text-center border-[1px] border-[#b3b3b3] h-[80px]">
                      {check} Add your users
                    </li>
                    <li className="bg-white p-4 md:p-2 mt-1 rounded-md flex items-center m-auto text-center  border-[1px] border-[#b3b3b3] h-[80px]">
                      {check} Show everyone&apos;s debts
                    </li>
                  </ul>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>
      <section className="overflow-y-scroll no-scrollbar h-screen sm:hidden -mt-[60px]">
        {show && <WhatsappDialog setShow={setShow} />}
        <div className="w-[780px] -mx-16">
          <img
            src="/assets/Grilla.png"
            alt="grilla"
            className="-m-72 -ml-40 w-full"
          />
        </div>
        <div className="absolute top-[480px] left-6">
          <button
            onClick={() => {
              setShow(true)
            }}
          >
            <img
              className="w-16"
              src={'/assets/Whatsapp.png'}
            />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-80 ml-8">
          <h2 className="text-3xl font-bold text-blueDark">Welcome to S.O.S Consortia</h2>
          <h4 className="text-xl text-blueDark">Your ideal software for consortia management</h4>
        </div>
        <div className="mt-6">
          <Link
            to={ !role || role === '' ? '/login' : (role === 'admin' ? '/admin' : '/user')}
            className="ml-40 border-2 border-blueDark py-4 px-10 rounded-lg shadow-2xl"
          >
            <span className="text-blueDark text-lg">Get Started!</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
