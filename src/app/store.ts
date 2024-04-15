import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {TasksActionType, todolistReducer} from "../features/TodolistsList/Todolist/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../features/TodolistsList/Todolist/tasks-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType | AppActionType | AuthActionsType
export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
export type AppDispatchType=ThunkDispatch<AppRootState, unknown, AppActionCreatorsTypes>
export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app: appReducer,
    auth:authReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

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