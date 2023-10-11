import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterType} from "./App";
import './App.css'

type TaskType={
    id:string,
    title:string,
    isDone:boolean
}

type TodolistPropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:(id:string)=>void,
    changeFilter:(value:FilterType)=>void,
    addTask:(title:string)=>void,
    changeChacked:(idChecked:string, isDone:boolean)=>void,
    filter:FilterType
}

export const Todolist = (props:TodolistPropsType) => {

        let [newTaskTitle, setNewTaskTitle]=useState('')

        let [error, setError]=useState<string|null>(null)


        const onChangeInputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
            setNewTaskTitle(event.currentTarget.value)
            setError(null)
        }

        const onClickBtnHandler=()=>{
            if (newTaskTitle.trim()!==''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')}
            else {setError("Invalid value")}
        }

        const onKeyEnter=(event:KeyboardEvent<HTMLInputElement>)=>{
            if (event.key==='Enter'&& newTaskTitle.trim()!==''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
            }
            else {setError("Invalid value")}
        }

        const onChangeAllFilter = () => {
        props.changeFilter('all')

        }

        const onChangeActiveFilter = () => {
        props.changeFilter('active')
        }

        const onChangeCompletedFilter = () => {
        props.changeFilter('completed')
        }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error? 'error':''}  onKeyPress={onKeyEnter} onChange={onChangeInputHandler} value={newTaskTitle}/>
                <button onClick={onClickBtnHandler}>+</button>
                {error && <div className={'textError'}>Invalid value</div>}
            </div>
            <ul>
                {props.tasks.map((s)=>{

                    const removeTaskHandler=()=>{
                        props.removeTask(s.id)
                    }

                    const changeChackedHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                        props.changeChacked(s.id,event.currentTarget.checked)
                    }

                    return <li className={s.isDone ?'done':''} key={s.id}>
                        <input onChange={changeChackedHandler} type="checkbox" checked={s.isDone}/>
                        <span>{s.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={props.filter==='all' ? 'button':''} onClick={onChangeAllFilter}>All</button>
                <button className={props.filter==='active' ? 'button':''} onClick={onChangeActiveFilter}>Active</button>
                <button className={props.filter==='completed' ? 'button':''} onClick={onChangeCompletedFilter}>Completed</button>
            </div>
        </div>
    );
};