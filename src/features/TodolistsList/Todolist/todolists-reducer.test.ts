import {v1} from "uuid";
import {
    ChangeFilterTdAC,
    SetTodolistsAC,
    todolistReducer
} from "./todolists-reducer";

// test('todolist should be removed', ()=> {
//         let todolistId1 = v1();
//         let todolistId2 = v1();
//
//         let todolists: Array<TodoListTitleType> = [
//             {
//                 id: todolistId1, title: 'What to learn', filter: 'all', addedDate: 'string',
//                 order: 0, entityStatus:'idle'
//             },
//             {
//                 id: todolistId2, title: 'What to bye', filter: 'all', addedDate: 'string',
//                 order: 0, entityStatus:'idle'
//             }
//         ]
//
//         const endState = todolistReducer(todolists, RemoveTdAC(todolistId1))
//
//         expect(endState.length).toBe(1)
//     }
//
// )

// test('todolist should be added', ()=>{
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
//     const endState=todolistReducer(todolists, AddTdAC({id:todolistId1, title:'What to learn', addedDate: 'string',
//         order: 0}))
//
//     expect(endState.length).toBe(3)
//
//
// })

// test('title of todolist should be changed', ()=>{
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
//     const endState=todolistReducer(todolists, ChangeTitleTdAC(todolistId1, "Hello"))
//
//     expect(endState.length).toBe(2)
//
// })

// test('filter of todolist should be changed', ()=>{
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
//     const endState=todolistReducer(todolists, ChangeFilterTdAC(todolistId1, 'active'))
//
//     expect(endState.length).toBe(2)
//
// })

// test('todolists should be set', ()=>{
//     let todolists:Array<TodoListTitleType>=[]
//
//     let action=SetTodolistsAC([{
//         id: '1',
//         title: 'string',
//         addedDate: 'string',
//         order: 0
//     }])
//
//     const endState=todolistReducer(todolists, action)
//
//         expect(endState.length).toBe(1)
//
//
// })
