import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../app/store";
import {appErrorAC} from "../app/app-reducer";


export function ErrorUtil() {

    let open=useSelector<AppRootState,string|null>((state)=>state.app.error)
    const dispatch=useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    };
    return (
        <Snackbar open={open!==null} autoHideDuration={5000} onClose={handleClose}>
        <Stack sx={{ width: '100%' }} style={{alignItems:'center'}}>
            <Alert severity="warning" onClose={() => {dispatch(appErrorAC({error:null}))}}>
                {open}
            </Alert>

        </Stack>
        </Snackbar>
    );
}
