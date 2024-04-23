import React, {ChangeEvent, useState} from 'react';
import {Input} from "@mui/material";

type EditSpanPropsType={
    title:string,
    changeEditSpan:(value:string)=>void
    disabled:boolean
}



export const EditSpan = React.memo( (props:EditSpanPropsType) => {

    let [onDouble, setonDouble]=useState(false)
    let [value, setValue]=useState('')

    const onDoubleClickHandler=()=>{
        setValue(props.title)
        setonDouble(true)
    }
    const onBlurInputHandler=()=>{
        setonDouble(false)
        props.changeEditSpan(value)
    }

    const onChangeInputHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)

    }

    return (
        <>
            {onDouble ?
                <Input style={{color:'white', width:'145px'}} disabled={props.disabled} onBlur={onBlurInputHandler} onChange={onChangeInputHandler} value={value} autoFocus />
                :
                <span onDoubleClick={onDoubleClickHandler} style={{width:'145px', wordBreak:'break-all'}}>{props.title}</span>
            }
        </>
    );
});

