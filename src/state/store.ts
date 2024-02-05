import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksActionType, todolistReducer} from "./todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {thunk, ThunkAction, ThunkActionDispatch} from "redux-thunk";

type AppActionCreatorsTypes= TasksReducerActionType | TasksActionType
export type AppActionsTypes= ThunkAction<void, AppRootState, unknown, AppActionCreatorsTypes>
export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer, applyMiddleware(thunk))