import {AppActionsTypes} from "./store";
import {authAPI, LoginDataType} from "../api/todolistsAPI";
import {appErrorAC, appStatusAC, setIsInitialisedAC} from "./app-reducer";
import {isAuthAC} from "./auth-reducer";


type LoginStateType={
    dataLogin:{
    userId:number|null
    }
}
let initialState={
    dataLogin:{
        userId:null
    }
}
export type LoginActionsType=ReturnType<typeof setLoginAC>

export const loginReducer=(state:LoginStateType= initialState, action:LoginActionsType)=>{
    switch (action.type) {
        case 'SET-LOGIN':
            return {...state, dataLogin:action.data}
        default:
            return state
    }
}

export const setLoginAC=(data: { userId:number|null })=>{
    return ({type:'SET-LOGIN', data:data} as const)
}

export const setLoginTC=(values:LoginDataType):AppActionsTypes=>{

    return (dispatch) => {
        dispatch(appStatusAC('loading'))
        authAPI.setLogin(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(appStatusAC('success'))
                    // dispatch(setLoginAC(res.data.data))
                    dispatch(isAuthAC(true))
                } else {
                    dispatch(appStatusAC('idle'))
                    dispatch(appErrorAC(res.data.messages[0]))
                }
            })

    }
}

export const logOutTC=():AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(appStatusAC('loading'))
        authAPI.logOut()
            .then((res)=>{
                dispatch(isAuthAC(false))
                dispatch(appStatusAC('success'))
            })
    }

}