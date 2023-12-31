import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {CommonInput} from "./CommonInput";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {AddTdAC, ChangeTitleTdAC, RemoveTdAC} from "./state/todolists-reducer";

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


    let dispatch= useDispatch()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)


    const addItem=useCallback((item:string)=>{
        let action=AddTdAC(item)
        dispatch(action)
    }, [dispatch])




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


                return <Grid item>
                    <Paper elevation={3} square={false} style={{padding:'10px'}}>
                        <Todolist title={t.title}
                                  id={t.id}
                                  filter={t.filter}
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

