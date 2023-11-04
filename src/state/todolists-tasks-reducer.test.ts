import {v1} from "uuid";
import {TodolistTasksType, TodoListTitleType} from "../App";
import {AddTdAC, RemoveTdAC, todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('todolist and task should be added', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    let tasks:TodolistTasksType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}],

        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Penсil', isDone: false}]
    }

    let action=AddTdAC('What to add')

    const endStateToDoList=todolistReducer(todolists, action)
    const endStateTasks=tasksReducer(tasks, action)

    expect(endStateToDoList.length).toBe(3)
    expect(endStateToDoList[2].title).toBe('What to add')
    expect(Object.keys(endStateTasks).length).toBe(3)


})

test('todolist and task should be deleted', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    let tasks:TodolistTasksType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: false},
            {id: '2', title: 'JS', isDone: false},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}],

        [todolistId2]: [
            {id: '1', title: 'Book', isDone: false},
            {id: '2', title: 'Penсil', isDone: false}]
    }

    let action=RemoveTdAC(todolistId1)

    const endStateToDoList=todolistReducer(todolists, action)
    const endStateTasks=tasksReducer(tasks, action)

    expect(endStateToDoList.length).toBe(1)
    expect(endStateToDoList[0].title).toBe('What to bye')
    expect(Object.keys(endStateTasks).length).toBe(1)


})