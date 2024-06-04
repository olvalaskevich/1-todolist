import {v1} from "uuid";
import {
    ChangeFilterTdAC,
    CreateTodolistsTC, DeleteTodolistsTC,
    SetTodolistsAC,
    todolistReducer, UpdateTodolistsTC
} from "./todolists-reducer";
import {TodoListTitleType} from "../../../app/types";
import {logOutTC} from "../../Auth/auth-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let todolists:Array<TodoListTitleType>=[
    {id:todolistId1, title:'What to learn', filter:'all', addedDate: 'string',
        order: 0, entityStatus:'idle'},
    {id:todolistId2, title:'What to bye', filter:'all', addedDate: 'string',
        order: 0, entityStatus:'idle'}
];
test('todolists should be set', ()=>{

    let todolists:Array<TodoListTitleType>=[]

    const endState=todolistReducer(todolists, SetTodolistsAC({td:[{
        id: '1',
        title: 'string',
        addedDate: 'string',
        order: 0}]}))

        expect(endState.length).toBe(1)

})
test('todolist should be added', ()=>{
    let td={
        id: '2',
        title: 'Market',
        addedDate: 'string',
        order: 0}

    const endState=todolistReducer(todolists, CreateTodolistsTC.fulfilled({td}, '', {
        title:'Market'}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Market')

})
test('title of todolist should be changed', ()=>{

    const endState=todolistReducer(todolists, UpdateTodolistsTC.fulfilled({
        id:todolistId1,
        value: 'What to read'}, '', {idTd:todolistId1, title:'What to read'}))

    expect(endState[0].title).toBe('What to read')

})
test('filter of todolist should be changed', ()=>{

    const endState=todolistReducer(todolists, ChangeFilterTdAC({id:todolistId1, value:'active'}))

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')

})
test('todolist should be removed', ()=> {

    const endState = todolistReducer(todolists, DeleteTodolistsTC.fulfilled({id:todolistId1},'',{idTd:todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to bye')

    })
test('todolists should be clear when we logout', ()=> {

    const endState = todolistReducer(todolists, logOutTC.fulfilled(false,''))

    expect(endState.length).toBe(0)

})

