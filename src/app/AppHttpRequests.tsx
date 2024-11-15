import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from "axios";


type TasksState = {
    [key: string]: DomainTask[]
}
export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldError = {
    error: string
    field: string
}

type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

type DeleteTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

type UpdateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}


export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

type CreateTaskResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: DomainTask
    }
}

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<TasksState>({})

    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                    'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                },
            })
            .then(res => {
                setTodolists(res.data)
                return res.data
            })
            .then(todolists => {
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(
                            `https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`,
                            {
                                headers: {
                                    Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                                    'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                                },
                            }
                        )
                        .then(res => {
                            setTasks({...tasks, [tl.id]: res.data.items})
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios
            .post<CreateTodolistResponse>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title},
                {
                    headers: {
                        Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                        'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                    },
                }
            )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                    'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                },
            })
            .then(res => {
                if (res.data.resultCode === 0) {
                    setTodolists(todolists.filter(tl => tl.id !== id))
                }
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<UpdateTodolistResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                        'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                    },
                }
            )
            .then(res => {
                if (res.data.resultCode === 0) {
                    setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl))
                }
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<CreateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer a7545aeb-8c84-40f1-86e5-6859ee1b6f96',
                        'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
                    },
                }
            )
            .then(res => {
                if(tasks[todolistId]){
                    setTasks({...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]]})
                }else{
                    setTasks({...tasks, [todolistId]: [res.data.data.item]})
                }

            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
    }

    return (
        <div style = {{margin: '20px'}}>
            <AddItemForm addItem = {createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key = {tl.id} style = {todolist}>
                        <div>
                            <EditableSpan
                                value = {tl.title}
                                onChange = {(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick = {() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem = {title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key = {task.id}>
                                        <Checkbox
                                            checked = {task.isDone}
                                            onChange = {e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value = {task.title}
                                            onChange = {title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick = {() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
