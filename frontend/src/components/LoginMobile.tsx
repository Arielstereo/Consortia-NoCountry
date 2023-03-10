import Container from '../components/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import loginService from '../services/loginService'
import { useAuthStore } from '../store/auth'
import { LoginValues } from '../interfaces/authInterfaces'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import axios from 'axios'
import { loginGoogleService } from '../services/loginGoogleService'

const LoginMobile = () => {
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
      setTimeout(() => {
        setLogError('')
      }, 4000)
      setLoading(false)
    }
    if (resp.ok) {
      setToken(resp.token)
      setLogError('')
      setId(resp.id)
      setRole(resp.role)
      resp.role === 'admin'
        ? navigate('/admin', { state: { show: 'profile' } })
        : navigate('/user', { state: { show: 'profile' } })
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
    <Container>
      <div className="font-sans text-[24px] py-14 grid -mt-[60px]">
        <div className=" flex text-[30px] font-bold text-blueDark mb-8 justify-between items-center">
          <button
            onClick={() => {
              navigate('/')
            }}
          >
            <div className=" h-[30px] mr-5">
              <img src={'/assets/icons/left-arrow.svg'} />
            </div>
          </button>
          <h2>Log In</h2>
          <Link to="/signin">
            <small className="text-sm">Sign In</small>
          </Link>
        </div>
        <h2 className=" mb-6 text-lg text-center">Please fill your info to start</h2>
        <div>
          <form onSubmit={handleSubmit(customSubmit)}>
            <input
              className={`border-2 ${
                !errors.email ? 'border-blueDark' : 'border-red'
              } rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              {...register('email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            <div className="h-8 ml-4 text-xs text-red">
              {errors.email?.type === 'required' && <p>E-mail is required</p>}
              {errors.email?.type === 'pattern' && <p>It&apos;s not a valid e-mail</p>}
              {logError === 'unverified' && <p>The email is not verified, please check your email</p>}
              {logError === 'email invalid' && <p>The email is incorrect</p>}
            </div>
            <input
              className={`border-2 ${
                !errors.password ? 'border-blueDark' : 'border-red'
              } rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
            />
            <div className="h-4 ml-4 text-xs  text-red">
              {errors.password?.type === 'required' && <p>Password is required</p>}
              {errors.password?.type === 'pattern' && <p>It&apos;s not a valid password</p>}
              {logError === 'password invalid' && <p>The password is incorrect</p>}
            </div>
            <Link to="/resetpassword">
              <p className="text-end text-base mb-8">Forgot your password?</p>
            </Link>
            <button
              type="submit"
              className="bg-blueDark disabled:opacity-60 text-white text-xl w-full h-12 rounded-2xl block ml-auto mb-8"
              disabled={!isDirty || !isValid}
            >
              {loading ? <PulseLoader color="white" /> : 'LOG IN'}
            </button>
          </form>

          {/* <div className="flex justify-end ">
                <h3>Not a member? </h3>
                <Link
                  to="/signin"
                  className="ml-2 underline text-blueDark font-bold mb-5"
                >
                  Sign In
                </Link>
              </div> */}
          <h3 className="mb-5 text-center text-lg">Or continue with</h3>
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
  )
}

export default LoginMobile
