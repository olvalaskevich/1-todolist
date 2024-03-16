import {FilterType, TodoListTitleType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {AppActionsTypes} from "./store";
import {appErrorAC, appStatusAC, statusType} from "./app-reducer";
import {SetTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


export type RemoveTODOLISTActionType={
    type:'Remove TODOLIST',
    id:string
}

export type AddTODOLISTActionType={
    type:'Add TODOLIST',
    td:TodolistType
}

export type SetTodolistsActionType={
    type:'SET-TODOLISTS',
    todolists:Array<TodolistType>

}
export type TasksActionType = RemoveTODOLISTActionType |
    AddTODOLISTActionType |
    ReturnType<typeof ChangeTitleTdAC> |
    ReturnType<typeof ChangeFilterTdAC> |
    SetTodolistsActionType |
    ReturnType<typeof ChangeStatusTodolistAC> |
    ReturnType<typeof ClearTodolistsLogOutAC>

const initialState:Array<TodoListTitleType>=[]
const slice=createSlice({
    name:'todolist',
    initialState:initialState,
    reducers:{
        RemoveTdAC(state, action:PayloadAction<{id:string}>) {
            return state.filter((s)=>s.id!==action.payload.id)
        },
        AddTdAC(state, action:PayloadAction<{td:TodolistType}>) {
            state.unshift({...action.payload.td, filter:'all', entityStatus: 'idle'})
        },
        ChangeTitleTdAC(state, action:PayloadAction<{id:string, value:string}>) {
            let tdl=state.find((t)=>t.id===action.payload.id)
            if (tdl)
            tdl.title=action.payload.value
        },
        ChangeFilterTdAC(state, action:PayloadAction<{id:string, value:FilterType}>) {
            let tdl=state.find((t)=>t.id===action.payload.id)
            if (tdl)
                tdl.filter=action.payload.value
        },
        SetTodolistsAC(state, action:PayloadAction<{td:Array<TodolistType>}>) {
            return action.payload.td.map((tl)=>{return {...tl, filter:'all', entityStatus:'idle'}})
        },
        ChangeStatusTodolistAC(state, action:PayloadAction<{idTd:string, statusTd:statusType}>) {
            let tdl=state.find((t)=>t.id===action.payload.idTd)
            if (tdl)
                tdl.entityStatus=action.payload.statusTd
        },
        ClearTodolistsLogOutAC(state, action:PayloadAction<{}>) {
            return []
        }
    }
})
export const todolistReducer=slice.reducer
export const {RemoveTdAC, AddTdAC, ChangeTitleTdAC, ChangeFilterTdAC, SetTodolistsAC,
    ChangeStatusTodolistAC,ClearTodolistsLogOutAC}=slice.actions
// export const todolistReducer= (state:Array<TodoListTitleType>=initialState, action:TasksActionType)=>{
//         switch (action.type){
//             case 'SET-TODOLISTS':
//                 return action.todolists.map((tl)=>{return {...tl, filter:'all', entityStatus:'idle'}})
//             case 'Remove TODOLIST':
//                 return state.filter((s)=>s.id!==action.id)
//             case 'Add TODOLIST':
//                 return [{...action.td, filter:'all', entityStatus: 'idle'}, ...state]
//             case 'Change title TODOLIST':{
//                 return state.map((tl)=>tl.id===action.idTd?{...tl, title:action.value}:tl)
//             }
//             case 'Change filter of todolist':{
//                 return state.map((tl)=>tl.id===action.idTd?{...tl, filter:action.filter}:tl)
//             }
//             case 'CHANGE STATUS OF TODOLIST':
//                 return state.map((tl)=>tl.id===action.idTd?{...tl, entityStatus:action.statusTd}:tl)
//             case 'CLEAR-TODOLISTS-LOGOUT':
//                 return []
//             default:
//                return state
//         }
// }

// export const RemoveTdAC=(id:string):RemoveTODOLISTActionType=>{
//     return {type:'Remove TODOLIST', id:id}
// }
// export const AddTdAC=(td:TodolistType):AddTODOLISTActionType=>{
//     return {type:'Add TODOLIST', td:td}
// }
// export const ChangeTitleTdAC=(id:string, value:string)=>{
//     return ({type:'Change title TODOLIST', idTd:id, value:value} as const)
// }
// export const ChangeFilterTdAC=(id:string, value:FilterType)=>{
//     return ({type:'Change filter of todolist', idTd:id, filter:value} as const)
// }
// export const SetTodolistsAC=(td:Array<TodolistType>):SetTodolistsActionType=>{
//     return {type:'SET-TODOLISTS', todolists:td}
// }
// export const ChangeStatusTodolistAC=(idTd:string, statusTd:statusType)=>{
//     return({type:'CHANGE STATUS OF TODOLIST', idTd:idTd, statusTd:statusTd} as const)
// }
// export const ClearTodolistsLogOutAC=()=>{
//     return ({type:'CLEAR-TODOLISTS-LOGOUT'} as const)
// }

export const GetTodolistsTC=()=>{
    return (dispatch:any)=>{
        dispatch(appStatusAC({status:'loading'}))
        todolistsAPI.getToDoLists()
            .then((res)=>{
                dispatch(SetTodolistsAC({td:res.data}))
                dispatch(appStatusAC({status:'idle'}))
            return res})
            .then((res)=>{
                res.data.forEach((td)=>dispatch(SetTasksTC(td.id)))
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const CreateTodolistsTC=(title:string)=>{
    return (dispatch:Dispatch)=>{
        dispatch(appStatusAC({status:'loading'}))
        todolistsAPI.createToDoLists(title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(AddTdAC({td:res.data.data.item}))
                dispatch(appStatusAC({status:'success'}))}
                else {
                    dispatch(appErrorAC({error:res.data.messages[0]}))
                    dispatch(appStatusAC({status:'idle'}))
                }
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}
export const DeleteTodolistsTC=(idTd:string)=>{
    return (dispatch:Dispatch)=>{
        dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'loading'}))
        todolistsAPI.deleteToDoList(idTd)
            .then((res)=>{
                dispatch(RemoveTdAC({id:idTd}))
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}
export const UpdateTodolistsTC=(idTd:string, title:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'loading'}))
        todolistsAPI.updateTodolist(idTd, title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(ChangeTitleTdAC({id:idTd, value:title}))
                dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))}
                else {
                    dispatch(appErrorAC({error:res.data.messages[0]}))
                    dispatch(ChangeStatusTodolistAC({idTd:idTd, statusTd:'success'}))
                }
            })
            .catch((err)=>{dispatch(appErrorAC({error:err}))})
    }
}



