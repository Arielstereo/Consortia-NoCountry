import React, { useState } from 'react'

const Header = () => {

    const [isNavOpen, setisNavOpen] = useState(false)

    const handleOpenNav = () => {
        setisNavOpen(!isNavOpen)
    }

    console.log(isNavOpen)

    return (
        <header>
            <nav
                className="flex flex-wrap items-center justify-between md:justify-around w-full py-4 md:py-0 px-4 text-[15px] bg-blueDark">
                <img src="/Logo-navBar.png" alt="" className='h-[91px] cursor-pointer' />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleOpenNav}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <div className={(isNavOpen ? 'hidden ' : '') + 'w-full md:flex md:items-center md:w-auto'} id="menu">
                    <ul
                        className="pt-4 text-[15px] text-white md:flex md:justify-between md:pt-0">
                        <li>
                            <a className="uppercase md:p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in" href="#"
                            >Home</a>
                        </li>
                        <li>
                            <a className="uppercase md:p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in" href="#"
                            >About Us</a
                            >
                        </li>
                        <li>
                            <a className="uppercase md:p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in" href="#"
                            >Contact</a
                            >
                        </li>
                        <li>
                            <a className="uppercase md:p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in" href="#"
                            >Features</a
                            >
                        </li>
                        <li>
                            <a
                                className="uppercase md:p-4 py-2 block hover:underline hover:scale-110 transition duration-300 ease-out hover:ease-in"
                                href="#"
                            >Prices</a
                            >
                        </li>
                    </ul>
                    <section className='flex md:pl-32 gap-5'>
                        <button className='uppercase px-4 py-1 bg-blue rounded-[16px] text-white w-100%'>Log In</button>
                        <button className='uppercase px-4 py-1 bg-blueDark rounded-[16px] text-[#3189FF] border-[1px] border-[#3189FF] w-100%'> Sign In</button>
                    </section>
                </div>
            </nav>
        </header>

    )
}

export default Header