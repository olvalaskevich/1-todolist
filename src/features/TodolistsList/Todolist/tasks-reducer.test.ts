import {v1} from "uuid";
import {TodolistTasksType} from "../../../app/App";
import {AddTaskAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";


// test ("Task should be removed", ()=> {
//
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let tasks:TodolistTasksType = {
//         [todolistId1]: [
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '2', title: 'JS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '3', title: 'React', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '4', title: 'Redux', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//         [todolistId2]: [
//             {id: '1', title: 'Book', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '2', title: 'Penсil', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//     }
//
//     let result:TodolistTasksType=tasksReducer(tasks, RemoveTaskAC(todolistId1, '1'))
//
//         expect(result[todolistId1].length).toBe(3)
//         expect(result[todolistId1][0].title).toBe('JS')
//
// }
// )

// test ("Task should be add", ()=> {
//
//         let todolistId1 = v1();
//         let todolistId2 = v1();
//
//         let tasks:TodolistTasksType = {
//             [todolistId1]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//             [todolistId2]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//         }
//
//         let result:TodolistTasksType=tasksReducer(tasks, AddTaskAC(todolistId1, 'CSS'))
//
//         expect(result[todolistId1].length).toBe(5)
//         expect(result[todolistId1][0].title).toBe('CSS')
//
//     }
// )

// test ("Task should be changed checked", ()=> {
//
//         let todolistId1 = v1();
//         let todolistId2 = v1();
//
//         let tasks:TodolistTasksType = {
//             [todolistId1]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//             [todolistId2]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//         }
//
//         let result:TodolistTasksType=tasksReducer(tasks, ChangeCheckedAC('1', true,  todolistId1))
//
//
//         expect(result[todolistId1][0].isDone).toBe(true)
//
//     }
// )

// test ("Task should be changed title of task", ()=> {
//
//         let todolistId1 = v1();
//         let todolistId2 = v1();
//
//         let tasks:TodolistTasksType = {
//             [todolistId1]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//             [todolistId2]: [
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//                 {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//         }
//
//         let result:TodolistTasksType=tasksReducer(tasks, ChangeTitleTaskAC('Hello', '1',  todolistId1))
//
//
//         expect(result[todolistId1][0].title).toBe('Hello')
//
//     }
// )

