import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionType, todolistReducer} from "./todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {LoginActionsType, loginReducer} from "./login-reducer";

type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType | AppActionType | AuthActionsType | LoginActionsType
export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
export type AppDispatchType=ThunkDispatch<AppRootState, unknown, AppActionCreatorsTypes>
export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer,
    app: appReducer,
    auth:authReducer,
    login:loginReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer, applyMiddleware(thunk))