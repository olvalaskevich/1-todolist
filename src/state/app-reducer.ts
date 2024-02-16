
export type statusType='idle'|'loading'|'success'
export type appStateType={
    status:statusType
    error:string|null
}
const initialState:appStateType={
    status:'idle',
    error:null,
}
export type AppActionType=ReturnType<typeof appStatusAC> |
    ReturnType<typeof appErrorAC>
export const appReducer=(state:appStateType=initialState, action:AppActionType)=>{
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status:action.status}
        case 'SET-ERROR':
            return {...state, error:action.error}
        default:
            return state
    }
}

export const appStatusAC=(status:statusType)=>{
    return ({type:'SET-STATUS', status: status} as const)
}
export const appErrorAC=(error:string|null)=>{
    return ({type:'SET-ERROR', error: error} as const)
}
