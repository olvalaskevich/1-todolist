import {ChangeFilterTdAC, ChangeStatusTodolistAC} from "./todolists-reducer";
import {TasksType, TodolistType} from "../../../api/todolistsAPI";
import {TodoListTitleType} from "../../../app/types";
import {ChangeEvent} from "react";

// tasks Reducer

export type TasksReducerActionType=
    SetTodolistsActionType

// todolists Reducer

export type SetTodolistsActionType={
    type:'SET-TODOLISTS',
    todolists:Array<TodolistType>

}
export type TasksActionType =
    ReturnType<typeof ChangeFilterTdAC> |
    SetTodolistsActionType |
    ReturnType<typeof ChangeStatusTodolistAC>

// Todolist

export type TodolistPropsType={
    todolist:TodoListTitleType
}

// Tasks

export type TaskPropsType={
    removeTaskHandler:(taskId:string)=>void
    changeChackedHandler:(event:ChangeEvent<HTMLInputElement>, taskId:string)=>void
    changeEditSpan:(value:string, taskId:string)=>void
    task:TasksType
    disabled:boolean

}