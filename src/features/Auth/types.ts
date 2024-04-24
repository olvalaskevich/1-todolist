import {setIsAuthAC} from "./auth-reducer";

//auth Reducer

export type DataAuthResponseType={
    id: number|null
    email: string
    login: string
}
export type AuthActionsType=ReturnType<typeof setIsAuthAC>

// Login

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}