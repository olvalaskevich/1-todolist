import {TodolistTasksType} from "../App";
import {
    AddTODOLISTActionType,
    ChangeStatusTodolistAC,
    RemoveTODOLISTActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TasksType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppActionsTypes} from "./store";
import {appErrorAC} from "./app-reducer";

export type TasksReducerActionType=ReturnType<typeof RemoveTaskAC> |
     ReturnType<typeof AddTaskAC>|
     ReturnType<typeof ChangeCheckedAC> |
     ReturnType<typeof ChangeTitleTaskAC>|
     ReturnType<typeof SetTasksAC> |
     AddTODOLISTActionType |
     RemoveTODOLISTActionType |
     SetTodolistsActionType

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
            return ({...state, [action.model.todoListId]:state[action.model.todoListId].map(t=>t.id===action.model.id?
                    {...t, status:action.model.status} : t)})}
        case 'Change title of task':{
            return ({...state, [action.value.todoListId]:state[action.value.todoListId].map((t)=>t.id===action.value.id ?
                    {...t, title:action.value.title} : t)})}
        case 'Add TODOLIST':{
            return {...state, [action.td.id]:[]}
        }
        case 'Remove TODOLIST':{
            let copyDataState={...state}
            delete copyDataState[action.id]
            return copyDataState
        }
        case 'SET-TASKS':{
            return {...state, [action.todolistId]:action.tasks}
        }
        default:
            return state
    }
}

export const RemoveTaskAC=(tdId:string, id:string)=>{
    return ({type:'Remove task', tdId: tdId, id: id} as const)
}
export const AddTaskAC=(task:TasksType)=>{
    return ({type:'Add task', task: task} as const)
}
export const ChangeCheckedAC=(model:TasksType)=>{
    return ({type:'Change checked',model: model} as const)
}
export const ChangeTitleTaskAC=(model:TasksType)=>{
    return ({type:'Change title of task', value:model} as const)
}
export const SetTasksAC=(todolistId:string, tasks:Array<TasksType>)=>{
    return ({type:'SET-TASKS', tasks:tasks, todolistId:todolistId} as const)
}
export const SetTasksTC=(idTd:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC(idTd, 'loading'))
        todolistsAPI.getTasks(idTd)
            .then((res)=>{
                dispatch(SetTasksAC(idTd, res.data.items))
                dispatch(ChangeStatusTodolistAC(idTd, 'success'))
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const AddTasksTC=(idTd:string, title:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC(idTd, 'loading'))
        return todolistsAPI.createTask(idTd, title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(AddTaskAC(res.data.data.item))
                dispatch(ChangeStatusTodolistAC(idTd, 'success'))
                }
                else {
                    dispatch(appErrorAC(res.data.messages[0]))
                    dispatch(ChangeStatusTodolistAC(idTd, 'idle'))
                }
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const DeleteTasksTC=(idTd:string, idTask:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC(idTd, 'loading'))
        todolistsAPI.deleteTask(idTd, idTask)
            .then((res)=>{
                dispatch(RemoveTaskAC(idTd, idTask))
                dispatch(ChangeStatusTodolistAC(idTd, 'success'))
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const UpdateTasksTC=(idTd:string, idTask:string, value:string):AppActionsTypes=>{
    return (dispatch, getState)=>{
        let allTasks=getState().tasks;
        let tasksForTodolists=allTasks[idTd]
        const task=tasksForTodolists.find((t)=>t.id===idTask)
        if (task){
            dispatch(ChangeStatusTodolistAC(idTd,'loading'))
        todolistsAPI.updateTask(idTd, idTask, {
            title: value,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        }).then((res)=>{
            if (res.data.resultCode===0){
            dispatch(ChangeTitleTaskAC(res.data.data.item))
            dispatch(ChangeStatusTodolistAC(idTd,'success'))}
            else {
                dispatch(appErrorAC(res.data.messages[0]))
                dispatch(ChangeStatusTodolistAC(idTd, 'success'))
            }
        }) .catch((err)=>{dispatch(appErrorAC(err))})
        }
    }
}
export const UpdateTasksStatusTC=(idTd:string, idTask:string, status:number):AppActionsTypes=>{
        return (dispatch, getState)=>{
            let allTasks=getState().tasks;
            let tasksForTodolists=allTasks[idTd]
            const task=tasksForTodolists.find((t)=>t.id===idTask)
            if (task){
                dispatch(ChangeStatusTodolistAC(idTd,'loading'))
        todolistsAPI.updateTask(idTd, idTask, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then((res)=>{
            dispatch(ChangeCheckedAC(res.data.data.item))
            dispatch(ChangeStatusTodolistAC(idTd,'success'))
        }).catch((err)=>{dispatch(appErrorAC(err))})}
    }
}