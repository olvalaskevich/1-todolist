import {appErrorAC, appStatusAC, setIsInitialisedAC} from "./app-reducer";
import {AppActionsTypes} from "./store";
import {authAPI, LoginDataType} from "../api/todolistsAPI";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {ClearTodolistsLogOutAC} from "./todolists-reducer";
import {ClearTasksLogOutAC} from "./tasks-reducer";

export type DataAuthResponseType={
    id: number|null
    email: string
    login: string
}

export type AuthActionsType=ReturnType<typeof setIsAuthAC>

let initialState={
    isAuth:false
}

const slice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsAuthAC (state, action:PayloadAction<{isAuth:boolean}>){

            state.isAuth=action.payload.isAuth
        }
        // isAuthAC (state, action:PayloadAction<{isAuth:boolean}>){
        //     state.isAuth=action.payload.isAuth
        // }
    }
})
export const authReducer=slice.reducer
export const setIsAuthAC=slice.actions.setIsAuthAC
// export const isAuthAC=slice.actions.isAuthAC
// export const authReducer=(state:AuthStateType=initialState, action:AuthActionsType)=>{
//     switch (action.type) {
//         case 'SET-IS-AUTH':
//             return {...state, data:action.data, isAuth:action.isAuth}
//         case 'IS-AUTH':
//             return {...state, isAuth:action.isAuth}
//         default:
//             return state
//     }
// }

// export const setIsAuthAC=(data:DataAuthResponseType, isAuth:boolean)=>{
//     return ({type:'SET-IS-AUTH',data:data, isAuth: isAuth} as const)
// }
// export const isAuthAC=(isAuth:boolean)=>{
//     return ({type:'IS-AUTH',isAuth: isAuth} as const)
// }

export const setIsAuthTC=()=>{
    return (dispatch:Dispatch) => {
        authAPI.setIsAuth()
            .then((res) => {
                dispatch(setIsInitialisedAC({isInitialized:true}))
                if (res.data.resultCode === 0) {
                    dispatch(setIsAuthAC({isAuth:true}))
                } else {
                    dispatch(setIsAuthAC({isAuth:true}))
                }

            })
    }
}
export const setLoginTC=(values:LoginDataType):AppActionsTypes=>{
    return (dispatch) => {
        dispatch(appStatusAC({status:'loading'}))
        authAPI.setLogin(values)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(appStatusAC({status:'success'}))
                    // dispatch(setLoginAC(res.data.data))
                    dispatch(setIsAuthAC({isAuth:true}))
                } else {
                    dispatch(appStatusAC({status:'idle'}))
                    dispatch(appErrorAC({error:res.data.messages[0]}))
                }
            })

    }
}
export const logOutTC=():AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(appStatusAC({status:'loading'}))
        authAPI.logOut()
            .then((res)=>{
                dispatch(setIsAuthAC({isAuth:false}))
                dispatch(ClearTodolistsLogOutAC({}))
                dispatch(ClearTasksLogOutAC({}))
                dispatch(appStatusAC({status:'success'}))
            })
    }

}