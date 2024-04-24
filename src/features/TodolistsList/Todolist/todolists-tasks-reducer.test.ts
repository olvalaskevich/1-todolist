import {v1} from "uuid";
import {todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

// test('todolist and task should be added', ()=>{
//     let todolistId1=v1();
//     let todolistId2=v1();
//
//     let todolists:Array<TodoListTitleType>=[
//         {id:todolistId1, title:'What to learn', filter:'all', addedDate: 'string',
//             order: 0, entityStatus:'idle'},
//         {id:todolistId2, title:'What to bye', filter:'all', addedDate: 'string',
//             order: 0, entityStatus:'idle'}
//     ]
//
//     let tasks:TodolistTasksType = {
//         [todolistId1]: [
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//         [todolistId2]: [
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//     }
//
//     let action=AddTdAC({id:todolistId1, title:'What to learn', addedDate: 'string',
//         order: 0})
//
//     const endStateToDoList=todolistReducer(todolists, action)
//     const endStateTasks=tasksReducer(tasks, action)
// if (endStateToDoList){
//     expect(endStateToDoList.length).toBe(3)
//
//     expect(Object.keys(endStateTasks).length).toBe(3)
// }
//
// })

// test('todolist and task should be deleted', ()=>{
//     let todolistId1=v1();
//     let todolistId2=v1();
//
//     let todolists:Array<TodoListTitleType>=[
//         {id:todolistId1, title:'What to learn', filter:'all', addedDate: 'string',
//             order: 0},
//         {id:todolistId2, title:'What to bye', filter:'all', addedDate: 'string',
//             order: 0}
//     ]
//
//     let tasks:TodolistTasksType = {
//         [todolistId1]: [
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}],
//
//         [todolistId2]: [
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'},
//             {id: '1', title: 'HTML&CSS', addedDate:1, deadline:'', description:'', order:0, startDate:'', priority:1, status: 0, todoListId:'todolistId1'}]
//         ]
//     }
//
//     let action=RemoveTdAC(todolistId1)
//
//     const endStateToDoList=todolistReducer(todolists, action)
//     const endStateTasks=tasksReducer(tasks, action)
//     if (endStateToDoList){
//     expect(endStateToDoList.length).toBe(1)
//     expect(endStateToDoList[0].title).toBe('What to bye')
//     expect(Object.keys(endStateTasks).length).toBe(1)
//     }
//
// })