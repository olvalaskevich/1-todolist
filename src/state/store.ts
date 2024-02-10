import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionType, todolistReducer} from "./todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {thunk, ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";

type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType | AppActionType
export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app: appReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer, applyMiddleware(thunk))