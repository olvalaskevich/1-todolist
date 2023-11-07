import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {CommonInput} from "./CommonInput";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {AddTaskAC, ChangeCheckedAC, ChangeTitleTaskAC, RemoveTaskAC} from "./state/tasks-reducer";
import {AddTdAC, ChangeFilterTdAC, ChangeTitleTdAC, RemoveTdAC} from "./state/todolists-reducer";

export type FilterType='all' | 'active' | 'completed'
export type TodoListTitleType={
    id:string,
    title:string,
    filter:FilterType
}

export type TodolistTasksType={
    [key:string]:Array<TaskType>
}

function App() {

    // let todolistId1=v1();
    // let todolistId2=v1();
    //
    //
    // let [tasks,setTasks]=useState<TodolistTasksType>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: false},
    //         {id: v1(), title: 'JS', isDone: false},
    //         {id: v1(), title: 'React', isDone: false},
    //         {id: v1(), title: 'Redux', isDone: false}],
    //
    //     [todolistId2]: [
    //         {id: v1(), title: 'Book', isDone: false},
    //         {id: v1(), title: 'Penсil', isDone: false}]
    // });
    //
    //
    //
    // let [todolists, setToDoList]=useState <Array<TodoListTitleType>>([
    //     {id:todolistId1, title:'What to learn', filter:'all'},
    //     {id:todolistId2, title:'What to bye', filter:'all'}
    // ])

    let dispatch= useDispatch()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)

    let tasks=useSelector<AppRootState, TodolistTasksType>((state)=>state.tasks)

    function removeTask(id:string, tdId:string){
      dispatch(RemoveTaskAC(tdId,id))
    }

    function addTask(title:string, tdId:string) {
        dispatch(AddTaskAC(tdId, title))
    }

    function changeChacked(idChecked:string, isDone:boolean, tdId:string){
        dispatch(ChangeCheckedAC(idChecked,isDone,tdId))
    }
    function changeEditSpan(value:string, id:string, idTd:string){

        dispatch(ChangeTitleTaskAC(value,id,idTd))
    }



    function changeFilter(value:FilterType, id:string){
        dispatch(ChangeFilterTdAC(id,value))
    }

    function deleteTodolist (tdId:string){
        let action=RemoveTdAC(tdId)
        dispatch(action)
    }

    function addItem(item:string){
        let action=AddTdAC(item)
        dispatch(action)
    }
    function changeToDoListEditSpan(value:string, idTd:string){

        dispatch(ChangeTitleTdAC(idTd,value))
    }



    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingTop:'20px'}}>
            <CommonInput label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'20px'}}>
            {todolists.map((t)=>{

                let tasksForTodolist=tasks[t.id];
                if (t.filter==='completed'){
                    tasksForTodolist=tasks[t.id].filter(t=> t.isDone);
                }
                if (t.filter==='active'){
                    tasksForTodolist=tasks[t.id].filter(t=> !t.isDone);
                }


                return <Grid item>
                    <Paper elevation={3} square={false} style={{padding:'10px'}}>
                    <Todolist title={t.title}
                                 id={t.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeChecked={changeChacked}
                                 filter={t.filter}
                                 deleteTodolist={deleteTodolist}
                                 changeEditSpan={changeEditSpan}
                                 changeToDoListEditSpan={changeToDoListEditSpan}
                />
                    </Paper>
                    </Grid>
            })}
                    </Grid>
            </Container>
        </div>
    );
}



export default App;

