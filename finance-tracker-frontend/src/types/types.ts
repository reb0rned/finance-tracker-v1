export interface IUser {
  id: number
  email: string
  token: string
}

export interface IUserData {
  email: string,
  password: string
}

export interface IResponseUserData {
  token: string
  user: IresponseUser
}

export interface IresponseUser {
  email: string
  id: string
  createdAt: string
  updatedAt: string
  password: string
}