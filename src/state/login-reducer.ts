import {AppActionsTypes} from "./store";
import {authAPI, LoginDataType} from "../api/todolistsAPI";
import {appErrorAC, appStatusAC} from "./app-reducer"
import {ClearTodolistsLogOutAC} from "./todolists-reducer";
import {ClearTasksLogOutAC} from "./tasks-reducer";
import {setIsAuthAC} from "./auth-reducer";


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