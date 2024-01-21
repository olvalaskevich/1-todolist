import {TodolistTasksType} from "../App";
import {v1} from "uuid";
import {AddTODOLISTActionType, RemoveTODOLISTActionType, SetTodolistsActionType} from "./todolists-reducer";

import {TaskStatuses, TasksType, todolistsAPI, UpdateTasksDomainType, UpdateTasksType} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";


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
    model:TasksType
}

type ChangeTitleTaskActionType={
    type:'Change title of task',
    value:TasksType
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

            let taskChecked=state[action.model.todoListId];
            state[action.model.todoListId]=taskChecked.map(t=>t.id===action.model.id? {...t, status:action.model.status} : t);

            return ({...state})
            }

        case 'Change title of task':{

            let changeToDoTask=state[action.value.todoListId];
            let changeTask=changeToDoTask.map((t)=>t.id===action.value.id ? {...t, title:action.value.title} : t);

            state[action.value.todoListId]=changeTask
            return ({...state})
        }
        case 'Add TODOLIST':{
            return {...state, [action.td.id]:[]}
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

export const ChangeCheckedAC=(model:TasksType):ChangeCheckedTypeAction=>{
    return {type:'Change checked',model: model}
}

export const ChangeTitleTaskAC=(model:TasksType):ChangeTitleTaskActionType=>{
    return {type:'Change title of task', value:model}
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

export const DeleteTasksTC=(idTd:string, idTask:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.deleteTask(idTd, idTask)
            .then((res)=>{dispatch(RemoveTaskAC(idTd, idTask))})
    }
}

export const UpdateTasksTC=(idTd:string, idTask:string, value:string)=>{

    return (dispatch:Dispatch, getState: ()=> AppRootState)=>{
        let allTasks=getState().tasks;
        let tasksForTodolists=allTasks[idTd]
        const task=tasksForTodolists.find((t)=>t.id===idTask)
        if (task)
        todolistsAPI.updateTask(idTd, idTask, {
            title: value,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        })
            .then((res)=>{dispatch(ChangeTitleTaskAC(res.data.data.item))})
    }
}

export const UpdateTasksStatusTC=(idTd:string, idTask:string, status:number)=>{
        return (dispatch:Dispatch, getState: () => AppRootState)=>{

            let allTasks=getState().tasks;
            let tasksForTodolists=allTasks[idTd]
            const task=tasksForTodolists.find((t)=>t.id===idTask)
            if (task)

        todolistsAPI.updateTask(idTd, idTask, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        })
            .then((res)=>{dispatch(ChangeCheckedAC(res.data.data.item))})
    }
}