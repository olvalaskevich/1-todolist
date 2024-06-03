import {appErrorAC, appStatusAC, setIsInitialisedAC} from "./app-reducer";
import {TasksType} from "../api/todolistsAPI";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {rootReducer} from "./store";
import {TasksActionType, TasksReducerActionType} from "../features/TodolistsList/Todolist/types";

export type statusType='idle'|'loading'|'success'
export type appStateType={
    status:statusType
    error:string|null
    isInitialized:boolean
}
export type AppActionType=ReturnType<typeof appStatusAC> |
    ReturnType<typeof appErrorAC> | ReturnType<typeof setIsInitialisedAC>
export type FilterType='all' | 'active' | 'completed'
export type TodoListTitleType = {
    id: string,
    title: string,
    addedDate: string
    order: number
} & { filter: FilterType }
    & { entityStatus: statusType }
export type TodolistTasksType={
    [key:string]:Array<TasksType>
}

//store

export type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType | AppActionType
export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
export type AppDispatchType=ThunkDispatch<AppRootState, unknown, AppActionCreatorsTypes>
export type AppRootState=ReturnType<typeof rootReducer>