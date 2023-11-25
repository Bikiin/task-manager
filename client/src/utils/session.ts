import type { User } from "@/interfaces/user"

export const getSession = () => sessionStorage.getItem("Authorization") ?? ""
export const deleteSession = () => sessionStorage.setItem("Authorization", "")
export const save = (response: Response) => sessionStorage.setItem("Authorization", response.headers.get('Authorization') ?? "")
export const checkIsAuthenticated = () => (sessionStorage.getItem("Authorization") ?? "").length
export const saveUser = (user: User) => sessionStorage.setItem("user", JSON.stringify(user))
export const getUser = () => JSON.parse(sessionStorage.getItem("user") ?? "")
