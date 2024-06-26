import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appStateType, statusType} from "./types";

// export type statusType='idle'|'loading'|'success'
// export type appStateType={
//     status:statusType
//     error:string|null
//     isInitialized:boolean
// }
const initialState:appStateType={
    status:'idle',
    error:null,
    isInitialized:false
}
// export type AppActionType=ReturnType<typeof appStatusAC> |
//     ReturnType<typeof appErrorAC> | ReturnType<typeof setIsInitialisedAC>

const slice=createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        appStatusAC(state, action:PayloadAction<{status:statusType}>) {
            state.status=action.payload.status
        },
        appErrorAC(state, action:PayloadAction<{error:string|null}>) {
            state.error=action.payload.error
        },
        setIsInitialisedAC(state, action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized=action.payload.isInitialized
        }
    }
})
export const appReducer=slice.reducer
export const appStatusAC=slice.actions.appStatusAC
export const appErrorAC=slice.actions.appErrorAC
export const setIsInitialisedAC=slice.actions.setIsInitialisedAC
// export const appReducer=(state:appStateType=initialState, action:AppActionType)=>{
//     switch (action.type) {
//         case 'SET-STATUS':
//             return {...state, status:action.status}
//         case 'SET-ERROR':
//             return {...state, error:action.error}
//         case 'SET-IS-INITIALISED':
//             return {...state, isInitialized:action.isInitialized}
//         default:
//             return state
//     }
// }

// export const appStatusAC=(status:statusType)=>{
//     return ({type:'SET-STATUS', status: status} as const)
// }
// export const appErrorAC=(error:string|null)=>{
//     return ({type:'SET-ERROR', error: error} as const)
// }
// export const setIsInitialisedAC=(isInitialized:boolean)=>{
//     return ({type:'SET-IS-INITIALISED', isInitialized: isInitialized} as const)
// }
