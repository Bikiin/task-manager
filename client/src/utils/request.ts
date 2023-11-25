import { save, deleteSession, getSession } from "./session"

interface RequesParams{
   url: string, 
   body?: unknown, 
   method?: method, 
   saveSession?: boolean,
   dirtyResponse?: boolean
}

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export const request = async ({url, body, method, saveSession, dirtyResponse}: RequesParams) =>{
   const Authorization = getSession()
   const response = await fetch(url, { method, body: JSON.stringify(body), headers: { "Content-Type": "application/json", Authorization }})
   
   if(dirtyResponse) return response

   const responseFormated = await response.json()

   if(saveSession) save(response)

   if(responseFormated.status === 401) {
      deleteSession()
      throw new SessionError(responseFormated.error.message)
   }

   if(!response.ok) throw new ApiError(responseFormated.error.message, responseFormated.error.content)

   return responseFormated
}

export class SessionError extends Error{
   constructor(message: string){
      super(message)
   }
}

export class ApiError extends Error{
   constructor(message: string, public content: unknown[]){
      super(message)
   }
}