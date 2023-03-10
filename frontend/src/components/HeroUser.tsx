type Props = React.ComponentProps<'div'>

const HeroUser = ({ children }: Props) => {
  return (
    <div className="w-full ">
      <div className=" pb-14 h-fit w-full md:bg-center md:bg-cover md:bg-[url('https://res.cloudinary.com/dozwd1ssj/image/upload/v1676310336/Payments_cpbq9l.jpg')]  ">
        {/* <div className=" pb-14 h-fit w-full "> */}
        {children}
      </div>
    </div>
  )
}

export default HeroUser
