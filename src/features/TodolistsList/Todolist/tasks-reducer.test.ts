import {v1} from "uuid";
import {AddTaskAC, RemoveTaskAC, tasksReducer, UpdateTasksStatusTC, UpdateTasksTC} from "./tasks-reducer";
import {TodolistTasksType} from "../../../app/types";

let todolistId1 = v1();
let todolistId2 = v1();
let tasks:TodolistTasksType = {
    [todolistId1]: [
        {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
        {id: '2', title: 'JS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
        {id: '3', title: 'React', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
        {id: '4', title: 'Redux', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],

    [todolistId2]: [
        {id: '1', title: 'Book', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
        {id: '2', title: 'Penсil', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
}
let model={
    description: '',
    title: 'CSS',
    status: 1,
    priority: 1,
    startDate: '',
    deadline: '',
    id: '1',
    todoListId: todolistId1,
    order: 0,
    addedDate: 0}

test ("Task should be removed", ()=> {

    let result:TodolistTasksType=tasksReducer(tasks, RemoveTaskAC({tdId:todolistId1, id:'1'}))

        expect(result[todolistId1].length).toBe(3)
        expect(result[todolistId1][0].title).toBe('JS')

}
)

test ("Task should be added", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, AddTaskAC({task:{
                description: '',
                title: 'CSS',
                status: 1,
                priority: 1,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: todolistId1,
                order: 0,
                addedDate: 0}}))

        expect(result[todolistId1].length).toBe(5)
        expect(result[todolistId1][0].title).toBe('CSS')

    }
)

test ("Should be changed checked (status of task)", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, UpdateTasksStatusTC.fulfilled({model},'',{
            idTd:model.todoListId,
            idTask:model.id,
            status:model.status}))

        expect(result[todolistId1][0].status).toBe(1)
        expect(result[todolistId1][1].status).toBe(0)

    }
)

test ("Should be changed title of task", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, UpdateTasksTC.fulfilled({model}, '',{
            idTd:model.todoListId,
            idTask:model.id,
            value:model.title}))

        expect(result[todolistId1][0].title).toBe('CSS')
        expect(result[todolistId1][1].title).toBe('JS')

    }
)

