import axios from '../axios/axiosInstance'
import { LoginValues } from '../interfaces/authInterfaces'
import { AxiosError } from 'axios'

const loginService = async (data: LoginValues) => {
  try {
    const resLogin = await axios.post('/api/auth/login', data)
    return resLogin.data
  } catch (error) {
    const err = error as AxiosError
    console.log(err)
    console.log('catch')
    return err.response?.data
  }
}

export default loginService
