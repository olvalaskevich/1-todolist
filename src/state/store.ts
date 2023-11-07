import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";



export const rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:tasksReducer
})

export type AppRootState=ReturnType<typeof rootReducer>

export const store=createStore(rootReducer)