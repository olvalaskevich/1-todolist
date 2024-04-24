import {todolistsAPI, TodolistType} from "../../../api/todolistsAPI";
import {appStatusAC} from "../../../app/app-reducer";
import {SetTasksTC} from "./tasks-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleError} from "../../../utils/handleError";
import {logOutTC} from "../../Auth/auth-reducer";
import {FilterType, statusType, TodoListTitleType} from "../../../app/types";


// export type RemoveTODOLISTActionType={
//     type:'Remove TODOLIST',
//     id:string
// }

// export type AddTODOLISTActionType={
//     type:'Add TODOLIST',
//     td:TodolistType
// }

// export type SetTodolistsActionType={
//     type:'SET-TODOLISTS',
//     todolists:Array<TodolistType>
//
// }
// export type TasksActionType =
//     ReturnType<typeof ChangeFilterTdAC> |
//     SetTodolistsActionType |
//     ReturnType<typeof ChangeStatusTodolistAC>

const initialState:Array<TodoListTitleType>=[]

export const GetTodolistsTC=createAsyncThunk('todolists/getTodolistsTC', async (param, thunkAPI)=>{
    thunkAPI.dispatch(appStatusAC({status:'loading'}))
    try{
        const res=await todolistsAPI.getToDoLists()
        thunkAPI.dispatch(appStatusAC({status:'idle'}))
        thunkAPI.dispatch(SetTodolistsAC({td:res.data}))
        res.data.forEach((td)=>thunkAPI.dispatch(SetTasksTC(td.id)))
    }
    catch (err){
        handleError(err,thunkAPI.dispatch)
    }
})
export const CreateTodolistsTC=createAsyncThunk('todolists/createTodolistsTC', async (params:{title:string}, thunkAPI)=>{
    thunkAPI.dispatch(appStatusAC({status:'loading'}))
    try{
        const res=await todolistsAPI.createToDoLists(params.title)
        if (res.data.resultCode===0){
            thunkAPI.dispatch(appStatusAC({status:'success'}))
            return {td:res.data.data.item}
        }
        else {
            thunkAPI.dispatch(appStatusAC({status:'idle'}))
            handleError(res.data.messages[0], thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    }
    catch (err){
        handleError(err,thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

export const DeleteTodolistsTC=createAsyncThunk('todolists/deleteTodolistsTC', async (param:{idTd:string}, thunkAPI)=>{
    try{
        thunkAPI.dispatch(ChangeStatusTodolistAC({idTd:param.idTd, statusTd:'loading'}))
        await todolistsAPI.deleteToDoList(param.idTd)
        return {id:param.idTd}
    }
    catch (err){
        handleError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const UpdateTodolistsTC=createAsyncThunk('todolists/updateTodolistsTC', async (param:{idTd:string, title:string}, thunkAPI)=>{
    thunkAPI.dispatch(ChangeStatusTodolistAC({idTd:param.idTd, statusTd:'loading'}))
    try{
        const res=await todolistsAPI.updateTodolist(param.idTd, param.title)
        if (res.data.resultCode===0){
            thunkAPI.dispatch(ChangeStatusTodolistAC({idTd:param.idTd, statusTd:'success'}))
            return {id:param.idTd, value:param.title}
        }
        else {
            thunkAPI.dispatch(ChangeStatusTodolistAC({idTd:param.idTd, statusTd:'success'}))
            handleError(res.data.messages[0], thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    }
    catch (err){
        handleError(err,thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

export const AsyncTodolistsActions={
    GetTodolistsTC,
    CreateTodolistsTC,
    DeleteTodolistsTC,
    UpdateTodolistsTC
}
export const slice=createSlice({
    name:'todolist',
    initialState:initialState,
    reducers:{
        // RemoveTdAC(state, action:PayloadAction<{id:string}>) {
        //     return state.filter((s)=>s.id!==action.payload.id)
        // },
        // AddTdAC(state, action:PayloadAction<{td:TodolistType}>) {
        //     state.unshift({...action.payload.td, filter:'all', entityStatus: 'idle'})
        // },
        // ChangeTitleTdAC(state, action:PayloadAction<{id:string, value:string}>) {
        //     let tdl=state.find((t)=>t.id===action.payload.id)
        //     if (tdl)
        //     tdl.title=action.payload.value
        // },
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
        // ClearTodolistsLogOutAC(state, action:PayloadAction<{}>) {
        //     return []
        // }
    },
    extraReducers:(builder)=>{
        builder.addCase(CreateTodolistsTC.fulfilled, (state, action)=>{
            state.unshift({...action.payload.td, filter:'all', entityStatus: 'idle'})
        }).addCase(DeleteTodolistsTC.fulfilled, (state, action)=>{
            return state.filter((s)=>s.id!==action.payload.id)
        }).addCase(UpdateTodolistsTC.fulfilled, (state, action)=>{
            let tdl=state.find((t)=>t.id===action.payload.id)
            if (tdl)
                tdl.title=action.payload.value
        }).addCase(logOutTC.fulfilled, (state, action)=>{
            return []
        });
    }
})
export const todolistReducer=slice.reducer
export const {ChangeFilterTdAC, SetTodolistsAC,
    ChangeStatusTodolistAC}=slice.actions
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





