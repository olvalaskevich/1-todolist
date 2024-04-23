import {Container, Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {CommonInput} from "../../components/CommonInput";
import {useSelector} from "react-redux";
import {useActions, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {AuthSelectors} from "../Auth";
import {TodolistsActions, TodolistSelectors} from "./Todolist";



export const Todolists=React.memo(()=>{

    let dispatch= useAppDispatch()
    let todolists=useSelector(TodolistSelectors.todolistsSelector)

    let isAuth=useSelector(AuthSelectors.authSelector)
    let {GetTodolistsTC, CreateTodolistsTC}=useActions(TodolistsActions)

    const addItem=useCallback((item:string)=>{
        // let action=AddTdAC(item)
        CreateTodolistsTC({title:item})
    }, [dispatch])

    useEffect(()=>{
        if (isAuth){
        GetTodolistsTC()}
    },[])

    if (!isAuth) return <Navigate to={'/login'}/>
    else
        return (
            <>
                <Grid container style={{paddingTop: '20px', paddingLeft:'20px'}}>
                    <CommonInput disabled={false} label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                <Container style={{paddingBottom:'20px', display: 'flex', flexWrap:'nowrap', overflowX:'scroll', width:'auto', gap:'20px', marginTop:'20px'}}>

                {todolists.map((t) => {
                        return <Grid item xs={8} style={{maxWidth:'310px', flex:'none'}}>
                        <Paper elevation={3} square={false} style={{padding: '10px', backgroundColor:'rgb(17,35,65)',color:'white'}}>
                            <Todolist todolist={t}/>
                        </Paper>
                        </Grid>
                            })}
                </Container>




            </>)
}
)