import Container from '../components/Container'
import { Link, useNavigate } from 'react-router-dom'
import BackgroundImage from '../components/BackgroundImage'
import { useForm, type SubmitHandler } from 'react-hook-form'
import loginService from '../services/loginService'
import { useAuthStore } from '../store/auth'
import { LoginValues } from '../interfaces/authInterfaces'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import axios from 'axios'
import { loginGoogleService } from '../services/loginGoogleService'
import LoginMobile from '../components/LoginMobile'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginValues>({ mode: 'onTouched' })

  const [logError, setLogError] = useState('')
  const [loading, setLoading] = useState(false)

  const setToken = useAuthStore((state) => state.setToken)
  const setId = useAuthStore((state) => state.setId)
  const setRole = useAuthStore((state) => state.setRole)
  const navigate = useNavigate()

  // const user = userStore((state) => state.userData)

  const customSubmit: SubmitHandler<LoginValues> = async (data: LoginValues) => {
    setLoading(true)
    const resp = await loginService(data)

    if (!resp.ok) {
      if (resp.msg === 'Passwords are different') setLogError('password invalid')
      if (resp.msg === 'Email or password is invalid') setLogError('email invalid')
      if (resp.msg === 'Unverified mail') setLogError('unverified')

      setLoading(false)
    }
    if (resp.ok) {
      setToken(resp.token)
      setLogError('')
      setId(resp.id)
      setRole(resp.role)
      resp.role === 'admin' ? navigate('/admin') : navigate('/user')
      setLoading(false)
    }
  }

  const loginGoogle = useGoogleLogin({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })
        const resp = await loginGoogleService(data)
        if (resp.ok) {
          setToken(resp.token)
          setLogError('')
          setId(resp.id)
          setRole(resp.role)
          resp.role === 'admin' ? navigate('/admin') : navigate('/user')
        }
      } catch (err) {
        console.log(err)
      }
    },
  })

  return (
    <>
      <div className="hidden sm:inline">
        {/* ------------------ DESKTOP ------------------ */}
        <BackgroundImage imageUrl="https://res.cloudinary.com/dozwd1ssj/image/upload/v1677333255/Body_Foto_kfit97.png">
          {logError === 'password invalid' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              The password is incorrect. Please retry..
            </p>
          )}
          {logError === 'email invalid' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              The email is incorrect
            </p>
          )}
          {logError === 'unverified' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              The email is not verified, please check your email
            </p>
          )}
          {(errors.email?.type === 'required' || errors.password?.type === 'required') && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Complete all required fields
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              It&apos;s not a valid e-mail
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              It&apos;s not a valid password
            </p>
          )}
          <Container>
            <div className="font-sans text-[24px] py-14 h-max mb-20">
              <h1 className="text-[30px]">Welcome!</h1>
              <h2 className="ml-6 mb-8">Please fill your info to start</h2>
              <div className="md:w-[454px]">
                <form onSubmit={handleSubmit(customSubmit)}>
                  <input
                    className={`border-2 ${
                      !errors.email ? 'border-blueDark' : 'border-red'
                    } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    {...register('email', {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                  />
                  <input
                    className={`border-2 ${
                      !errors.password ? 'border-blueDark' : 'border-red'
                    } rounded-lg h-12 px-4 mb-1 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                    type="password"
                    placeholder="Enter your password"
                    {...register('password', {
                      required: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                  />
                  <p className="text-end text-base mb-8">
                    <Link to="/resetpassword">Forgot your password?</Link>
                  </p>
                  <button
                    type="submit"
                    className="bg-blueDark disabled:opacity-60 text-white text-xl w-60 h-12 rounded-2xl block ml-auto mb-5"
                    disabled={!isDirty || !isValid}
                  >
                    {loading ? <PulseLoader color="white" /> : 'LOG IN'}
                  </button>
                </form>

                <div className="flex justify-end ">
                  <h3>Not a member? </h3>
                  <Link
                    to="/signin"
                    className="ml-2 underline text-blueDark font-bold mb-5"
                  >
                    Sign In
                  </Link>
                </div>
                <h3 className="mb-5 text-center">Or continue with</h3>
                <div className="flex justify-center">
                  <button
                    className="mx-3"
                    onClick={() => {
                      loginGoogle()
                    }}
                  >
                    <img
                      src="/assets/social/Google.png"
                      alt=""
                    />
                  </button>
                  {/* <button className="mx-3">
                    <img
                      src="/assets/social/Facebook.png"
                      alt=""
                    />
                  </button>
                  <button className="mx-3">
                    <img
                      src="/assets/social/Twitter.png"
                      alt=""
                    />
                  </button> */}
                </div>
              </div>
            </div>
          </Container>
        </BackgroundImage>
      </div>

      {/* ------------------ MOBILE ------------------ */}
      <div className="sm:hidden">
        <LoginMobile />
      </div>
    </>
  )
}

export default Login
