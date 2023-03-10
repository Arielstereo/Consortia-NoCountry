import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormRegisterData } from '../interfaces/authInterfaces'
import registerService from '../services/registerService'
import BlueModal from '../components/modal/BlueModal'
import { useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { loginGoogleService } from '../services/loginGoogleService'
import { useAuthStore } from '../store/auth'

const SigninMobile = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mailError, setMailError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<FormRegisterData>({ mode: 'onTouched' })

  const customSubmit: SubmitHandler<FormRegisterData> = async (data: FormRegisterData) => {
    setLoading(true)
    const { name, lastname, password, email } = data
    const resp = await registerService({ name, lastname, password, email })
    if (!resp.ok) {
      if (resp.msg === 'Email used') setMailError(true)
      setTimeout(() => {
        setMailError(false)
      }, 4000)
      setLoading(false)
    } else {
      setMailError(false)
      console.log(resp)
      setLoading(false)
      setModalOpen(true)
    }
  }

  const setToken = useAuthStore((state) => state.setToken)
  const setId = useAuthStore((state) => state.setId)
  const setRole = useAuthStore((state) => state.setRole)
  const navigate = useNavigate()

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
      <div className="font-sans text-[24px]  py-14 grid -mt-[60px]">
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
          <h2>Sign In</h2>
          <Link to="/login">
            <small className="text-sm">Log In</small>
          </Link>
        </div>
        <h2 className=" mb-6 text-lg text-center">Please fill your info to start</h2>
        <div>
          <form onSubmit={handleSubmit(customSubmit)}>
            <input
              className={`border-2 ${
                !errors.name ? 'border-blueDark' : 'border-red'
              } rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
              type="text"
              placeholder="Enter your name"
              autoComplete="off"
              {...register('name', { required: true })}
            />
             <div className="h-4 ml-4 text-xs  text-red">
              {errors.name?.type === 'required' && <p>Name is required</p>}
            </div>
            <input
              className={`border-2 ${
                !errors.lastname ? 'border-blueDark' : 'border-red'
              } rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
              type="text"
              placeholder="Enter your lastname"
              autoComplete="off"
              {...register('lastname', { required: true })}
            />
            <div className="h-4 ml-4 text-xs  text-red">
              {errors.lastname?.type === 'required' && <p>Lastname is required</p>}
            </div>
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
            <div className="h-4 ml-4 text-xs  text-red">
              {errors.email?.type === 'required' && <p>E-mail is required</p>}
              {errors.email?.type === 'pattern' && <p>It&apos;s not a valid e-mail</p>}
              {mailError && <p>Email already used</p>}
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
              {errors.password?.type === 'pattern' && <p className=' -ml-4'>8 characters, uppercase, lowercase, number and special</p>}
            </div>
            <input
              className={`border-2 ${
                !errors.password2 ? 'border-blueDark' : 'border-red'
              } rounded-lg h-12 px-4 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
              type="password"
              placeholder="Repeat your password"
              {...register('password2', {
                required: true,
                validate: (val: string) => watch('password') === val,
              })}
            />
            <div className="h-4 ml-4 text-xs  text-red">
              {errors.password2?.type === 'validate' && <p>Passwords do not match</p>}
            </div>
            <div className="flex justify-start mb-6">
              <input
                type="checkbox"
                className="w-7 mr-2"
                {...register('check', { required: true })}
              />
              <h3 className="text-sm">
                I agree to the
                <Link
                  to=""
                  className="ml-2 underline text-blueDark font-bold mb-5"
                >
                 terms and conditions.
                </Link>
              </h3>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blueDark disabled:opacity-60 text-white text-xl w-full h-12 rounded-2xl block ml-auto mb-4"
                disabled={!isDirty || !isValid}
              >
                {loading ? <PulseLoader color="white" /> : 'SIGN IN'}
              </button>
            </div>
          </form>

          <h3 className="mb-5 text-center text-lg">Or continue with</h3>
          <div className="flex justify-center">
            <button
              className="mx-10"
              onClick={() => {
                loginGoogle()
              }}
            >
              <img
                src="/assets/social/Google.png"
                alt=""
              />
            </button>
            {/* <button className="mx-10">
                <img
                  src="/assets/social/Facebook.png"
                  alt=""
                />
              </button>
              <button className="mx-10">
                <img
                  src="/assets/social/Twitter.png"
                  alt=""
                />
              </button> */}
          </div>
        </div>
      </div>
      <BlueModal isOpen={modalOpen}>
        <p>Your account has been created, wait for an email to validate your account.</p>
        <button className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6">
          <Link to="/">OK</Link>
        </button>
      </BlueModal>
    </Container>
  )
}

export default SigninMobile
