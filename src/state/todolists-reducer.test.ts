import {v1} from "uuid";
import {TodoListTitleType} from "../App";
import {AddTdAC, ChangeFilterTdAC, ChangeTitleTdAC, RemoveTdAC, todolistReducer} from "./todolists-reducer";

test('todolist should be removed', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    const endState=todolistReducer(todolists, RemoveTdAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('todolist should be added', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    const endState=todolistReducer(todolists, AddTdAC('What to add'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to add')

})

test('title of todolist should be changed', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    const endState=todolistReducer(todolists, ChangeTitleTdAC(todolistId1, "Hello"))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('Hello')

})

test('filter of todolist should be changed', ()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    let todolists:Array<TodoListTitleType>=[
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ]

    const endState=todolistReducer(todolists, ChangeFilterTdAC(todolistId1, 'active'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')

})
