export interface IResponseTransactionLoader {
  categories: ICategory[]
  transactions: ITransaction[]
}

export interface ICategory {
  title: string
  id: number
  createdAt: string
  updatedAt: string
  transactions: []
}

export interface ITransaction {
  id: number
  title: string
	type: "income" | "expense"
	amount: number
  createdAt: string
  updatedAt: string
  category: ICategory
}

export interface IUser {
  id: number
  email: string
  token: string
}

export interface IUserData {
  email: string
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