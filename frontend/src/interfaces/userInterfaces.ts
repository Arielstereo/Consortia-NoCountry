export interface UserProfile {
  _id: string
  name: string
  lastname: string
  email: string
  img?: string
  phone?: string
  role: string
  isValidated: boolean
  status: boolean
  apt?: string
  consortium?: UserConsortia[]
}

interface UserConsortia {
  _id: string
  address: string
  admin: Admin
  img?: string
  name: string
  status: string
}

interface Admin {
  email: string
  lastname: string
  name: string
  _id: string
  img: string
  phone: string
}

export interface IResponseUser {
  ok: boolean
  user: UserProfile
}
