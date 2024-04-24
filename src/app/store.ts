import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {todolistReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/Todolist/tasks-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {AppDispatchType} from "./types";

// export type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType | AppActionType | AuthActionsType
// export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
// export type AppDispatchType=ThunkDispatch<AppRootState, unknown, AppActionCreatorsTypes>
// export type AppRootState=ReturnType<typeof rootReducer>
export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app: appReducer,
    auth:authReducer
})



// export const store=createStore(rootReducer, applyMiddleware(thunk))


export const store=configureStore({
    reducer:rootReducer
})
type DispatchType=typeof store.dispatch
export const useAppDispatch=()=>useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject>(actions:T){
    const dispatch=useAppDispatch()
    const boundActions=useMemo(()=>{
        return bindActionCreators(actions,dispatch)
    }, [])
    return boundActions
}