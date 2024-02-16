import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/store";

type CommonInputPropsType={
    label:string,
    addItem:(item:string)=>void,
    disabled:boolean
}


export const CommonInput = React.memo( (props:CommonInputPropsType) => {


    let [newTaskTitle, setNewTaskTitle]=useState('')
    let [error, setError]=useState<string|null>(null)
    let addTaskError=useSelector<AppRootState, string|null>(state=>state.app.error)
    const onChangeInputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setNewTaskTitle(event.currentTarget.value)
        if (error!==null)
        setError(null)

    }

    const onClickBtnHandler=()=>{
        if (newTaskTitle.trim()!==''){
            props.addItem(newTaskTitle.trim())
            if (addTaskError===null){
            setNewTaskTitle('')}
        }
        else {setError("Invalid value")}
    }

    const onKeyEnter=(event:KeyboardEvent<HTMLInputElement>)=>{

        if (event.key==='Enter'&& newTaskTitle.trim()!==''){
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
        if (event.key==='Enter'&& newTaskTitle.trim()==='') {
            setError("Invalid value")
        }
    }



    return (
        <div>
            <TextField error={!!error}
                       id="outlined-basic"
                       label={props.label}
                       color={'secondary'}
                       variant="outlined"
                       onKeyPress={onKeyEnter}
                       onChange={onChangeInputHandler}
                       value={newTaskTitle}
                       disabled={props.disabled}/>
            <IconButton disabled={props.disabled} onClick={onClickBtnHandler} color={"secondary"}>
                <AddOutlined/>
            </IconButton>
            {error && <div className={'textError'}>Invalid value</div>}
        </div>
    );
});

