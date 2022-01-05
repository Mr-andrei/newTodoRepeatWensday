import { TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TASK',
    todolistID: string
    taskId:string
}
export type AddTodolistActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId:string
}

export type  ChangeTaskStatusACType ={
    type:"REMOVE-TASK-STATUS"
    taskId:string
    todolistID:string
    isDone:boolean

}
export type changeTaskTitleACType ={
    type:"REMOVE-TASK-TITLE"
    taskId:string
    todolistID:string
    title:string
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTaskStatusACType | changeTaskTitleACType ;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(tl => tl.id != action.taskId)}
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone:false }
            return {...state, [action.todolistId]:[ newTask, ...state[action.todolistId ] ]}
        }
        case "REMOVE-TASK-STATUS":{
            return {...state, [action.todolistID]: state[action.todolistID]
                    .map(m => action.taskId === m.id ? {...m, isDone: action.isDone} : m )}
        }
        case "REMOVE-TASK-TITLE":{
            return {...state, [action.todolistID]: state[action.todolistID].map(m => action.taskId === m.id ? {...m, title: action.title} : m )}
        }

        default:return state
    }
}

export const removeTaskAC = (taskId:string, todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TASK',taskId:taskId, todolistID: todolistId,}
}
export const AddTaskAC = (title: string, todolistId: string): AddTodolistActionType => {
    return { type: 'ADD-TASK', title:title, todolistId:todolistId}
}

export const changeTaskStatusAC = (taskId:string, todolistID:string,isDone:boolean):ChangeTaskStatusACType => {
    return {
        type: "REMOVE-TASK-STATUS",
        taskId,
        todolistID,
        isDone,
    }
}
export const changeTaskTitleAC = (taskId:string, todolistID:string,title:string):changeTaskTitleACType => {
    return {
        type: "REMOVE-TASK-TITLE",
        taskId,
        todolistID,
        title,
    }
}