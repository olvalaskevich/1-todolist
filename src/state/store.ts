import {combineReducers} from "redux";
import {TasksActionType, todolistReducer} from "./todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

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