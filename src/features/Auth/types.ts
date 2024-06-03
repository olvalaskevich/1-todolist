

//auth Reducer

export type DataAuthResponseType={
    id: number|null
    email: string
    login: string
}


// Login

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}