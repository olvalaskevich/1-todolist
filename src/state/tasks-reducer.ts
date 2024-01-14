import {TodolistTasksType} from "../App";
import {v1} from "uuid";
import {AddTODOLISTActionType, RemoveTODOLISTActionType, SetTodolistsActionType} from "./todolists-reducer";

import {TasksType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";


type RemoveTaskTypeAction={
    type:'Remove task',
    tdId:string,
    id:string
}

type AddTaskTypeAction={
    type:'Add task',
    task:TasksType

}

type ChangeCheckedTypeAction={
    type:'Change checked',
    idChecked:string,
    isDone:boolean,
    tdId:string
}

type ChangeTitleTaskActionType={
    type:'Change title of task',
    value:string,
    id:string,
    idTd:string
}

type SetTasksActionType={
    type:'SET-TASKS'
    tasks:Array<TasksType>
    todolistId:string
}

type TasksReducerActionType=RemoveTaskTypeAction |
    AddTaskTypeAction |
    ChangeCheckedTypeAction |
    ChangeTitleTaskActionType |
    AddTODOLISTActionType |
    RemoveTODOLISTActionType |
    SetTodolistsActionType |
    SetTasksActionType

const initialState:TodolistTasksType= {}

export const tasksReducer=(state:TodolistTasksType=initialState, action:TasksReducerActionType)=>{
    switch (action.type){
        case 'SET-TODOLISTS':{
            const copyState={...state}
            action.todolists.forEach((tl)=>copyState[tl.id]=[])
            return copyState
        }
        case 'Remove task':
            return {...state, [action.tdId]:state[action.tdId].filter( t => t.id !== action.id )}

        case 'Add task':
            return {...state, [action.task.todoListId]:[...state[action.task.todoListId], action.task]}

        case 'Change checked':{

            let taskChecked=state[action.tdId];
            state[action.tdId]=taskChecked.map(t=>t.id===action.idChecked? {...t, isDone:action.isDone} : t);

            return {...state}
            }

        case 'Change title of task':{
            let changeToDoTask=[...state[action.idTd]];
            let changeTask=changeToDoTask.find((t)=>t.id===action.id);
            if (changeTask)
                changeTask.title=action.value
            return {...state, [action.idTd]: changeToDoTask}
        }
        case 'Add TODOLIST':{
            return {...state, [action.idTd]:[]}
        }

        case 'Remove TODOLIST':{
            let copyDataState={...state}
            delete copyDataState[action.id]
            return copyDataState
        }
        case 'SET-TASKS':{
            let copyState= {...state}
            copyState[action.todolistId]=action.tasks
            return copyState

        }

        default:
            return state

    }
}


export const RemoveTaskAC=(tdId:string, id:string):RemoveTaskTypeAction=>{
    return {type:'Remove task', tdId: tdId, id: id}
}

export const AddTaskAC=(task:TasksType):AddTaskTypeAction=>{
    return {type:'Add task', task: task}
}

export const ChangeCheckedAC=(idChecked:string, isDone:boolean, tdId:string):ChangeCheckedTypeAction=>{
    return {type:'Change checked', idChecked:idChecked, isDone: isDone, tdId: tdId}
}

export const ChangeTitleTaskAC=(value:string, id:string, idTd:string):ChangeTitleTaskActionType=>{
    return {type:'Change title of task', value:value, id: id, idTd: idTd}
}

export const SetTasksAC=(todolistId:string, tasks:Array<TasksType>)=>{
    return {type:'SET-TASKS', tasks:tasks, todolistId:todolistId}
}

export const SetTasksTC=(idTd:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.getTasks(idTd)
            .then((res)=>{dispatch(SetTasksAC(idTd, res.data.items))})
    }
}

export const AddTasksTC=(idTd:string, title:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.createTask(idTd, title)
            .then((res)=>{dispatch(AddTaskAC(res.data.data.item))})
    }
}
