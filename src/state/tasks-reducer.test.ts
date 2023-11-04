import {v1} from "uuid";
import {TodolistTasksType} from "../App";
import {AddTaskAC, ChangeCheckedAC, ChangeTitleTaskAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";


test ("Task should be removed", ()=> {

    let todolistId1 = v1();
    let todolistId2 = v1();

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

    let result:TodolistTasksType=tasksReducer(tasks, RemoveTaskAC(todolistId1, '1'))

        expect(result[todolistId1].length).toBe(3)
        expect(result[todolistId1][0].title).toBe('JS')

}
)

test ("Task should be add", ()=> {

        let todolistId1 = v1();
        let todolistId2 = v1();

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

        let result:TodolistTasksType=tasksReducer(tasks, AddTaskAC(todolistId1, 'CSS'))

        expect(result[todolistId1].length).toBe(5)
        expect(result[todolistId1][0].title).toBe('CSS')

    }
)

test ("Task should be changed checked", ()=> {

        let todolistId1 = v1();
        let todolistId2 = v1();

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

        let result:TodolistTasksType=tasksReducer(tasks, ChangeCheckedAC('1', true,  todolistId1))


        expect(result[todolistId1][0].isDone).toBe(true)

    }
)

test ("Task should be changed title of task", ()=> {

        let todolistId1 = v1();
        let todolistId2 = v1();

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

        let result:TodolistTasksType=tasksReducer(tasks, ChangeTitleTaskAC('Hello', '1',  todolistId1))


        expect(result[todolistId1][0].title).toBe('Hello')

    }
)

