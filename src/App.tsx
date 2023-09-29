import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

let tasks=[
    {id:0, title:'HTML&CSS', isDone:true},
    {id:1, title:'JS', isDone:true},
    {id:2, title:'React', isDone:false},
    {id:2, title:'Redux', isDone:false},
]

function removeTask(id:number){
    tasks=tasks.filter( t => t.id !== id )
}


function App() {
    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}



export default App;

