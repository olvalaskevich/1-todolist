import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {CommonInput} from "../../components/CommonInput";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootState} from "../../app/store";
import {TodoListTitleType} from "../../app/App";
import {CreateTodolistsTC, GetTodolistsTC} from "./Todolist/todolists-reducer";
import {Navigate} from "react-router-dom";
import {AuthSelectors} from "../Auth";


export const Todolists=React.memo(()=>{

    let dispatch= useDispatch<AppDispatchType>()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)

    let isAuth=useSelector(AuthSelectors.authSelector)


    const addItem=useCallback((item:string)=>{
        // let action=AddTdAC(item)
        dispatch(CreateTodolistsTC({title:item}) as any)
    }, [dispatch])

    useEffect(()=>{
        if (isAuth){
        dispatch(GetTodolistsTC())}
    },[])

    if (!isAuth) return <Navigate to={'/login'}/>
    else
        return (
            <>
                <Grid container style={{paddingTop: '20px'}}>
                    <CommonInput disabled={false} label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                {todolists.map((t) => {

                    return <Grid item>
                        <Paper elevation={3} square={false} style={{padding: '10px'}}>
                            <Todolist todolist={t}/>
                        </Paper>
                    </Grid>
                })}


            </>)
}
)