import {appErrorAC, appStatusAC, setIsInitialisedAC} from "./app-reducer";
import {AppActionsTypes} from "./store";
import {authAPI, LoginDataType} from "../api/todolistsAPI";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClearTodolistsLogOutAC} from "./todolists-reducer";
import {ClearTasksLogOutAC} from "./tasks-reducer";
import {handleError, handleErrorOrigin} from "./handleError";

export type DataAuthResponseType={
    id: number|null
    email: string
    login: string
}

export type AuthActionsType=ReturnType<typeof setIsAuthAC>

let initialState={
    isAuth:false
}
export const setIsAuthTC=createAsyncThunk('auth/setIsAuthTC', async (param, thunkAPI)=>{
    try{
        const res= await authAPI.setIsAuth()
        thunkAPI.dispatch(setIsInitialisedAC({isInitialized:true}))
        if (res.data.resultCode === 0) {
            return;
        } else {
           handleErrorOrigin(res.data.messages[0], thunkAPI.dispatch)
           return thunkAPI.rejectWithValue(null)
        }
    }
    catch (err){
        handleError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

export const setLoginTC=createAsyncThunk('auth/setLoginTC', async (values:LoginDataType, thunkAPI)=>{
    thunkAPI.dispatch(appStatusAC({status:'loading'}))
    try{
        const res=await authAPI.setLogin(values)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appStatusAC({status:'success'}))
            return;
        } else {
            thunkAPI.dispatch(appStatusAC({status:'idle'}))
            handleErrorOrigin(res.data.messages[0], thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    }
    catch (err){handleError(err,thunkAPI.dispatch)}
})

export const logOutTC=createAsyncThunk('auth/logOutTC', async (param, thunkAPI)=>{
    thunkAPI.dispatch(appStatusAC({status:'loading'}))
    try{
        await authAPI.logOut()
        thunkAPI.dispatch(ClearTodolistsLogOutAC({}))
        thunkAPI.dispatch(ClearTasksLogOutAC({}))
        thunkAPI.dispatch(appStatusAC({status:'success'}))
        return false;
    }
    catch (err){
        handleError(err, thunkAPI.dispatch)
    }

})

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
    },
    extraReducers:(builder)=>{
        builder.addCase(setIsAuthTC.fulfilled, (state, action)=>{
            state.isAuth=true
        });
        builder.addCase(setLoginTC.fulfilled,(state, action)=>{
            state.isAuth=true
        });
        builder.addCase(logOutTC.fulfilled,(state, action)=>{
            state.isAuth=false
        });
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



