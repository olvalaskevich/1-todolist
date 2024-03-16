import {TodolistTasksType} from "../App";
import {
    AddTdAC,
    AddTODOLISTActionType,
    ChangeStatusTodolistAC, RemoveTdAC,
    RemoveTODOLISTActionType, SetTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TasksType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppActionsTypes} from "./store";
import {appErrorAC} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksReducerActionType=ReturnType<typeof RemoveTaskAC> |
     ReturnType<typeof AddTaskAC>|
     ReturnType<typeof ChangeCheckedAC> |
     ReturnType<typeof ChangeTitleTaskAC>|
     ReturnType<typeof SetTasksAC> |
     AddTODOLISTActionType |
     RemoveTODOLISTActionType |
     SetTodolistsActionType |
     ReturnType<typeof ClearTasksLogOutAC>

const initialState:TodolistTasksType= {}
const slice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        RemoveTaskAC(state, action:PayloadAction<{tdId:string, id:string}>) {
            const tasks=state[action.payload.tdId]
            const index=tasks.findIndex((t)=>t.id===action.payload.id)
            if (index>-1)
                tasks.splice(index, 1)
        },
        AddTaskAC(state, action:PayloadAction<{task:TasksType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        ChangeCheckedAC(state, action:PayloadAction<{model:TasksType}>) {
            const tasks=state[action.payload.model.todoListId]
            const index=tasks.findIndex((t)=>t.id===action.payload.model.id)
            if (index>-1)
                tasks[index].status=action.payload.model.status
        },
        ChangeTitleTaskAC(state, action:PayloadAction<{model:TasksType}>) {
            const tasks=state[action.payload.model.todoListId]
            const index=tasks.findIndex((t)=>t.id===action.payload.model.id)
            if (index>-1)
                tasks[index].title=action.payload.model.title
        },
        SetTasksAC(state, action:PayloadAction<{todolistId:string, tasks:Array<TasksType>}>) {
            state[action.payload.todolistId]=action.payload.tasks
        },
        ClearTasksLogOutAC(state, action:PayloadAction<{}>) {
            return {}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(SetTodolistsAC, (state,action)=>{
            action.payload.td.forEach((tl:any)=>state[tl.id]=[])
        });
        builder.addCase(AddTdAC, (state,action)=>{
            state[action.payload.td.id]=[]
        });
        builder.addCase(RemoveTdAC, (state,action)=>{
            delete state[action.payload.id]
        })
    }
})
export const tasksReducer=slice.reducer
export const {RemoveTaskAC, AddTaskAC,
    ChangeCheckedAC, ChangeTitleTaskAC,
    SetTasksAC, ClearTasksLogOutAC}=slice.actions
// export const tasksReducer=(state:TodolistTasksType=initialState, action:any)=>{
//     switch (action.type){
//         case SetTodolistsAC.type:{
//             const copyState={...state}
//             action.payload.td.forEach((tl:any)=>copyState[tl.id]=[])
//             return copyState
//         }
//         case 'Remove task':
//             return {...state, [action.tdId]:state[action.tdId].filter( t => t.id !== action.id )}
//         case 'Add task':
//             return {...state, [action.task.todoListId]:[...state[action.task.todoListId], action.task]}
//         case 'Change checked':{
//             return ({...state, [action.model.todoListId]:state[action.model.todoListId].map(t=>t.id===action.model.id?
//                     {...t, status:action.model.status} : t)})}
//         case 'Change title of task':{
//             return ({...state, [action.value.todoListId]:state[action.value.todoListId].map((t)=>t.id===action.value.id ?
//                     {...t, title:action.value.title} : t)})}
//         case AddTdAC.type:{
//             return {...state, [action.payload.td.id]:[]}
//         }
//         case RemoveTdAC.type:{
//             let copyDataState={...state}
//             delete copyDataState[action.payload.id]
//             return copyDataState
//         }
//         case 'SET-TASKS':{
//             return {...state, [action.todolistId]:action.tasks}
//         }
//         case 'CLEAR-TASKS-LOGOUT':
//             return {}
//         default:
//             return state
//     }
// }

// export const RemoveTaskAC=(tdId:string, id:string)=>{
//     return ({type:'Remove task', tdId: tdId, id: id} as const)
// }
// export const AddTaskAC=(task:TasksType)=>{
//     return ({type:'Add task', task: task} as const)
// }
// export const ChangeCheckedAC=(model:TasksType)=>{
//     return ({type:'Change checked',model: model} as const)
// }
// export const ChangeTitleTaskAC=(model:TasksType)=>{
//     return ({type:'Change title of task', value:model} as const)
// }
// export const SetTasksAC=(todolistId:string, tasks:Array<TasksType>)=>{
//     return ({type:'SET-TASKS', tasks:tasks, todolistId:todolistId} as const)
// }
// export const ClearTasksLogOutAC=()=>{
//     return ({type:'CLEAR-TASKS-LOGOUT'} as const)
// }
export const SetTasksTC=(idTd:string)=>{
    return (dispatch:Dispatch)=>{
        dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'loading'}))
        todolistsAPI.getTasks(idTd)
            .then((res)=>{
                dispatch(SetTasksAC({todolistId:idTd, tasks:res.data.items}))
                dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}
export const AddTasksTC=(idTd:string, title:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'loading'}))
        return todolistsAPI.createTask(idTd, title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(AddTaskAC({task:res.data.data.item}))
                dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))
                }
                else {
                    dispatch(appErrorAC({error:res.data.messages[0]}))
                    dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'idle'}))
                }
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}
export const DeleteTasksTC=(idTd:string, idTask:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'loading'}))
        todolistsAPI.deleteTask(idTd, idTask)
            .then((res)=>{
                dispatch(RemoveTaskAC({tdId:idTd, id:idTask}))
                dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}
export const UpdateTasksTC=(idTd:string, idTask:string, value:string):AppActionsTypes=>{
    return (dispatch, getState)=>{
        let allTasks=getState().tasks;
        let tasksForTodolists=allTasks[idTd]
        const task=tasksForTodolists.find((t)=>t.id===idTask)
        if (task){
            dispatch(ChangeStatusTodolistAC({idTd:idTd,statusTd:'loading'}))
        todolistsAPI.updateTask(idTd, idTask, {
            title: value,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        }).then((res)=>{
            if (res.data.resultCode===0){
            dispatch(ChangeTitleTaskAC({model:res.data.data.item}))
            dispatch(ChangeStatusTodolistAC({idTd:idTd,statusTd:'success'}))}
            else {
                dispatch(appErrorAC({error:res.data.messages[0]}))
                dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))
            }
        }) .catch((err)=>{dispatch(appErrorAC({error:err}))})
        }
    }
}
export const UpdateTasksStatusTC=(idTd:string, idTask:string, status:number):AppActionsTypes=>{
        return (dispatch, getState)=>{
            let allTasks=getState().tasks;
            let tasksForTodolists=allTasks[idTd]
            const task=tasksForTodolists.find((t)=>t.id===idTask)
            if (task){
                dispatch(ChangeStatusTodolistAC({idTd:idTd,statusTd:'loading'}))
        todolistsAPI.updateTask(idTd, idTask, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        }).then((res)=>{
            dispatch(ChangeCheckedAC({model:res.data.data.item}))
            dispatch(ChangeStatusTodolistAC({idTd:idTd,statusTd:'success'}))
        }).catch((err)=>{dispatch(appErrorAC({error:err}))})}
    }
}