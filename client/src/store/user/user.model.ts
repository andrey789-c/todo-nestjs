export interface IUser {
  id: number,
  username: string
}

export type IUserStore = {
  user: IUser | null
  error: string | null
  getUser: () => void
  login: (username: string, password: string) => void
  register: (username: string, password: string) => void
  logout: () => void
}