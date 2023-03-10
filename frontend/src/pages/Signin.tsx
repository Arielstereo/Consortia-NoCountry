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
import SigninMobile from '../components/SigninMobile'

const Signin = () => {
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
    <>
      <BlueModal isOpen={modalOpen}>
        <p>Your account has been created, wait for an email to validate your account.</p>
        <button className="bg-blue text-white text-lg w-14 h-10 rounded-2xl mt-6">
          <Link to="/">OK</Link>
        </button>
      </BlueModal>
      <div className="hidden sm:inline">
        {/* ------------------ DESKTOP ------------------ */}
        <div>
          {mailError && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Email already used
            </p>
          )}
          {errors.check?.type === 'required' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Must accept terms and conditions
            </p>
          )}
          {errors.phone?.type === 'pattern' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              It&apos;s not a valid phone number
            </p>
          )}
          {(errors.name?.type === 'required' ||
            errors.lastname?.type === 'required' ||
            errors.email?.type === 'required' ||
            errors.password?.type === 'required' ||
            errors.password2?.type === 'required') && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Complete all required fields
            </p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              It&apos;s not a valid e-mail
            </p>
          )}
          {errors.password2?.type === 'validate' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Passwords do not match
            </p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="absolute w-full h-8 px-8 bg-red rounded-b-sm border border-black text-lg font-sans text-white">
              Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number
              and one special character
            </p>
          )}
          <Container>
            <div className=" font-sans text-[24px] py-14 h-max mb-20">
              <h1 className="text-[30px]">Welcome!</h1>
              <h2 className="ml-6 mb-8">Please fill your info to start</h2>
              <div className="w-full">
                <form
                  onSubmit={handleSubmit(customSubmit)}
                  className="lg:w-fit mx-auto"
                >
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 ">
                    <div className="lg:max-w-[440px] justify-self-start">
                      <input
                        className={`border-2 ${
                          !errors.name ? 'border-blueDark' : 'border-red'
                        } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="off"
                        {...register('name', { required: true })}
                      />
                      <input
                        className={`border-2 ${
                          !errors.lastname ? 'border-blueDark' : 'border-red'
                        } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                        type="text"
                        placeholder="Enter your lastname"
                        autoComplete="off"
                        {...register('lastname', { required: true })}
                      />
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
                    </div>
                    <div className="lg:max-w-[440px] justify-self-end">
                      <input
                        className={`border-2 ${
                          !errors.password ? 'border-blueDark' : 'border-red'
                        } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                          required: true,
                          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        })}
                      />
                      <input
                        className={`border-2 ${
                          !errors.password2 ? 'border-blueDark' : 'border-red'
                        } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                        type="password"
                        placeholder="Repeat your password"
                        {...register('password2', {
                          required: true,
                          validate: (val: string) => watch('password') === val,
                        })}
                      />
                      <input
                        className={`border-2 ${
                          !errors.phone ? 'border-blueDark' : 'border-red'
                        } rounded-lg h-12 px-4 mb-8 w-full placeholder:italic placeholder:text-grey bg-transparent focus:outline-none text-lg`}
                        type="text"
                        placeholder="Enter your phone"
                        autoComplete="off"
                        // eslint-disable-next-line no-useless-escape
                        {...register('phone', { pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-start mb-6">
                    <input
                      type="checkbox"
                      className="w-7 mr-2"
                      {...register('check', { required: true })}
                    />
                    <h3 className="text-lg">
                      I agree to the
                      <Link
                        to=""
                        className="ml-2 underline text-blueDark font-bold mb-5"
                      >
                        terms and conditions and privacy policy.
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-blueDark disabled:opacity-60 text-white text-xl w-60 h-12 rounded-2xl block ml-auto mb-2"
                      disabled={!isDirty || !isValid}
                    >
                      {loading ? <PulseLoader color="white" /> : 'SIGN IN'}
                    </button>
                    <div className="flex justify-end text-lg">
                      <h3>Already a member? </h3>
                      <Link
                        to="/login"
                        className="ml-2 underline text-blueDark font-bold mb-5"
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
                </form>

                <h3 className="mb-5 text-center">Or continue with</h3>
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
          </Container>
        </div>
      </div>
      {/* ------------------ MOBILE ------------------ */}
      <div className="sm:hidden">
        <SigninMobile />
      </div>
    </>
  )
}

export default Signin
