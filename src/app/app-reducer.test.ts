import {appStateType} from "./types";
import {appErrorAC, appReducer, appStatusAC, setIsInitialisedAC} from "./app-reducer";

let state:appStateType={
    status:'idle',
    error:null,
    isInitialized:false
}
test('status of app should be changed', ()=>{

    const endState=appReducer(state, appStatusAC({status:'loading'}))

    expect(endState.status).toBe('loading')

})
test('error should be added', ()=>{

    const endState=appReducer(state, appErrorAC({error:'Error added'}))

    expect(endState.error).toBe('Error added')

})
test('app should be initialized', ()=>{

    const endState=appReducer(state, setIsInitialisedAC({isInitialized:true}))

    expect(endState.isInitialized).toBe(true)

})