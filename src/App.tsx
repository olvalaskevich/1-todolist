import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const tasks1=[
    {id:0, title:'HTML&CSS', isDone:true},
    {id:1, title:'JS', isDone:true},
    {id:2, title:'React', isDone:false},
]

const tasks2=[
    {id:0, title:'Hello World', isDone:true},
    {id:1, title:'I am Happy', isDone:true},
    {id:2, title:'Yo', isDone:false},
]
function App() {
    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks1}/>
            <Todolist title='Songs' tasks={tasks2}/>
        </div>
    );
}



export default App;

