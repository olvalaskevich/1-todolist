import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect} from "react";
import {CommonInput} from "./CommonInput";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TodoListTitleType} from "./App";
import {CreateTodolistsTC, GetTodolistsTC} from "./state/todolists-reducer";



export const Todolists=()=>{

    let dispatch= useDispatch()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)

    const addItem=useCallback((item:string)=>{
        // let action=AddTdAC(item)
        dispatch(CreateTodolistsTC(item) as any)
    }, [dispatch])

    useEffect(()=>{
        dispatch(GetTodolistsTC() as any)
    },[])

    return(
        <>
        <Grid container style={{paddingTop:'20px'}}>
            <CommonInput disabled={false} label={'New ToDoList'} addItem={addItem}/>
        </Grid>
    {todolists.map((t)=>{

        return <Grid item>
            <Paper elevation={3} square={false} style={{padding:'10px'}}>
                <Todolist todolist={t}/>
            </Paper>
        </Grid>
    })}


        </>)}