import axios from 'axios'
import {DataAuthResponseType} from "../features/Auth/types";


const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY':'61bc7b39-2a5d-4430-ab3f-67a78a4381b2'
    }
})

export type TodolistType={
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<T={}>={
    resultCode: number
    messages: Array<string>
    data: {
        item: T
    }
}

type ResponseAuthType<T>={
    data:T
    resultCode: number
    messages: Array<string>
}

export type LoginDataType={
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}

export type TasksType={
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}

type ResponseTasksType={
    items: Array<TasksType>
    totalCount: number
    error: string
}

export type UpdateTasksType={
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type UpdateTasksDomainType={
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}


export const todolistsAPI={

    // TODOLISTS

    getToDoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createToDoLists(title: string) {
        return instance.post<ResponseType<TodolistType>>('todo-lists', {title:title})
    },

    updateTodolist(idTd:string, title:string){
        return instance.put<ResponseType>(`todo-lists/${idTd}`, {title:title})
    },

    deleteToDoList(idTd:string){
        return instance.delete<ResponseType>(`todo-lists/${idTd}`)
    },

    // TASKS

    getTasks(idTd:string){
        return instance.get<ResponseTasksType>(`todo-lists/${idTd}/tasks`)
    },

    createTask(idTd:string, title:string){
        return instance.post<ResponseType<TasksType>>(`todo-lists/${idTd}/tasks`, {title:title})
    },

    updateTask(idTd:string, taskId:string, model:UpdateTasksType){
        return instance.put<ResponseType<TasksType>>(`todo-lists/${idTd}/tasks/${taskId}`, model)
    },

    deleteTask(idTd:string, taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${idTd}/tasks/${taskId}`)
    }

}

export const authAPI={

    //AUTH ME

    setIsAuth(){
        return instance.get<ResponseAuthType<DataAuthResponseType>>('auth/me')
    },

    setLogin(payload:LoginDataType) {
        return instance.post<ResponseAuthType<{userId:number}>>('auth/login', payload)
    },

    logOut() {
        return instance.delete<ResponseAuthType<{}>>('auth/login')
    }

}