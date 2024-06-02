import {v1} from "uuid";
import {
    AddTasksTC,
    DeleteTasksTC,
    tasksReducer,
    UpdateTasksStatusTC,
    UpdateTasksTC
} from "./tasks-reducer";
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
};
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
    addedDate: 0};
let task={
    description: '',
    title: 'Hello',
    status: 0,
    priority: 1,
    startDate: '',
    deadline: '',
    id: '3',
    todoListId: todolistId2,
    order: 0,
    addedDate: 0}

test ("Should be changed title of task", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, UpdateTasksTC.fulfilled({model}, '',{
            idTd:model.todoListId,
            idTask:model.id,
            value:model.title}))

        expect(result[todolistId1][0].title).toBe('CSS')
        expect(result[todolistId1][1].title).toBe('JS')

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
test ("Task should be added", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, AddTasksTC.fulfilled({task}, '', {
            idTd:task.todoListId,
            title:task.title}))

        expect(result[todolistId2].length).toBe(3)
        expect(result[todolistId2][0].title).toBe('Hello')

    }
)
test ("Task should be removed", ()=> {

        let result:TodolistTasksType=tasksReducer(tasks, DeleteTasksTC.fulfilled({tdId: todolistId1,id:'4'},'',{
            idTd:todolistId1,
            idTask:'4'}))

        expect(result[todolistId1].length).toBe(3)

    }
)



