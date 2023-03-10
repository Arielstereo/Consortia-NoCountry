import BackgroundImage from '../components/BackgroundImage'
import Container from '../components/Container'

const About = () => {
  return (
    <section className="bg-redLight h-full w-full">
      <div className="w-full h-full">
        <BackgroundImage
          imageUrl={'https://res.cloudinary.com/dozwd1ssj/image/upload/v1676392033/boy_and_city_psrw7i.png'}
        >
          <Container>
            <div className="w-full sm:flex grid items-center justify-center">
              <div className="w-full sm:flex sm:flex-row p-8 justify-center">
                <div className="py-16 animate-fadeInBottom text-blueDark">
                  <h1 className="text-4.5xl font-bold">About Us</h1>
                  <h2 className="text-2xl py-4 max-w-md">
                    We are a team that work everyday to develop great products that make people&apos;s lives easier.
                  </h2>
                  <ul className="text-2.5xl mt-32 h-[130px] flex flex-col justify-between text-blueDark">
                    <li className="font-bold">24 COUNTRIES</li>
                    <li className="font-bold">3200 MEMBERS</li>
                  </ul>
                </div>
                <div className="sm:w-[640px] grid gap-10">
                  <img
                    src={'https://res.cloudinary.com/dozwd1ssj/image/upload/v1676392263/people4_kjmexi.png'}
                    className="w-full max-w-[560px] min-w-[300px] rounded-md border-1 border-black drop-shadow-[0px_4px_1px_rgba(0,0,0,0.5)] transition ease-in-out delay-100 duration-300 hover:scale-105 animate-fadeInRight"
                  />
                  <img
                    src={'https://res.cloudinary.com/dozwd1ssj/image/upload/v1676392261/people3_nrhxeo.png'}
                    className="w-full max-w-[560px] min-w-[300px] md:ml-20 rounded-md border-1 border-black drop-shadow-[0px_4px_1px_rgba(0,0,0,0.5)] transition ease-in-out delay-100 duration-300 hover:scale-105 animate-fadeInLeft"
                  />
                </div>
              </div>
            </div>
          </Container>
        </BackgroundImage>
      </div>
      <Container>
        <div className="flex flex-row justify-between w-full h-[800px]">
          <ul className="max-w-[560px] flex flex-col pr-10 mt-6">
            <li className="py-10">
              <h2 className="text-2xl font-bold">MISION</h2>
              <p className="text-lg pl-8 mt-5">
                We want to provide the best software for consortio management in Latin America.
              </p>
            </li>
            <li className="py-10">
              <h2 className="text-2xl font-bold">VISION</h2>
              <p className="text-lg pl-8 mt-5">
                Helping people communicate and making everyday
                <br />
                life easier.
              </p>
            </li>
            <li className="py-10">
              <h2 className="text-2xl font-bold">VALUES</h2>
              <p className="text-lg pl-8 mt-5">Humans making products for humans.</p>
            </li>
          </ul>
          <div className="w-full h-full hidden lg:flex">
            <BackgroundImage
              imageUrl="https://res.cloudinary.com/dozwd1ssj/image/upload/v1676344074/About_us_ig6jdr.jpg"
              className=" "
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
