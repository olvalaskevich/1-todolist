import * as TodolistSelectors from './selectors'
import {AsyncTasksActions} from './tasks-reducer'
import {AsyncTodolistsActions} from './todolists-reducer'
import {slice as sliceTd} from './todolists-reducer'
import {slice as sliceTask} from './tasks-reducer'


const TodolistsActions={
    ...AsyncTodolistsActions,
    ...sliceTd.actions
}
const TasksActions={
    ...AsyncTasksActions,
    ...sliceTask.actions
}

export {
    TodolistSelectors,
    TasksActions,
    TodolistsActions
}