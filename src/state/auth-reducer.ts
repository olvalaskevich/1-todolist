import {setIsInitialisedAC} from "./app-reducer";
import {AppActionsTypes} from "./store";
import {authAPI} from "../api/todolistsAPI";

export type DataAuthResponseType={
    id: number|null
    email: string
    login: string
}
export type AuthStateType={
    data: DataAuthResponseType
    resultCode: number|null
    messages:string[]
    isAuth:boolean
}
export type AuthActionsType=ReturnType<typeof setIsAuthAC> |
    ReturnType<typeof isAuthAC>

let initialState={
    data:{
        id: null,
        email: '',
        login: ''
    },
    resultCode: null,
    messages:[],
    isAuth:false
}
export const authReducer=(state:AuthStateType=initialState, action:AuthActionsType)=>{
    switch (action.type) {
        case 'SET-IS-AUTH':
            return {...state, data:action.data, isAuth:action.isAuth}
        case 'IS-AUTH':
            return {...state, isAuth:action.isAuth}
        default:
            return state
    }
}

export const setIsAuthAC=(data:DataAuthResponseType, isAuth:boolean)=>{
    return ({type:'SET-IS-AUTH',data:data, isAuth: isAuth} as const)
}
export const isAuthAC=(isAuth:boolean)=>{
    return ({type:'IS-AUTH',isAuth: isAuth} as const)
}


export const setIsAuthTC=():AppActionsTypes=>{
    return (dispatch) => {
        authAPI.setIsAuth()
            .then((res) => {
                dispatch(setIsInitialisedAC(true))
                if (res.data.resultCode === 0) {
                    dispatch(setIsAuthAC(res.data.data, true))
                } else {
                    dispatch(setIsAuthAC(res.data.data, false))
                }
            })
    }
}