import { AxiosError } from 'axios'
import axios from '../axios/axiosInstance'
import { useAuthStore } from '../store/auth'

export interface ApiResponse {
  ok: boolean
  data: any
}

export const changePaymentStatusService = async (id: string, pStatus: string): Promise<ApiResponse> => {
  const data = {
    pStatus
  }
  const token = useAuthStore.getState().token
  try {
    const resp = await axios.put(`/api/payment/changePaymentStatus/${id}`, data, {
      headers: {
        token: `${token}`,
      },
    })
    return { ok: true, data: resp.data }
  } catch (error) {
    const err = error as AxiosError
    return { ok: false, data: err.response?.data }
  }
}
