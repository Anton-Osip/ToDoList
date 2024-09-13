import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todolist-api";
import axios from "axios";
import {log} from "node:util";
import {tasksReducer} from "../state/tasks-reducer";
import {taskApi} from "../api/taks-api";

export default {
    title: 'API/tasks-api',
}
const config = {
    withCredentials: true,
    headers: {
        "API-KEY": '23007c70-d369-4578-ab95-a24535e880f8'

    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const td: string = '11315af4-5ac9-4dc3-aec0-04e46a0ede98'
    useEffect(() => {
        taskApi.getTasks(td)
            .then((resp) => {
                console.log(resp.data.items)
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const td: string = '11315af4-5ac9-4dc3-aec0-04e46a0ede98'
    const payload = {
        title: 'new task'
    }
    useEffect(() => {
        taskApi.createTask(td, payload)
            .then((resp) => {
                setState(resp.data)
                console.log(resp.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId: string = '11315af4-5ac9-4dc3-aec0-04e46a0ede98'
    const taskId: string = "f0b5948e-3435-4f83-b72a-2956261756d6"
    useEffect(() => {
        taskApi.deleteTask(todolistId, taskId)
            .then((resp) => {
                setState(resp.data)
                console.log(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId: string = '11315af4-5ac9-4dc3-aec0-04e46a0ede98'
    const taskId: string = "dc16ad3b-d56c-498c-baa6-cfa184432d92"

    useEffect(() => {
        taskApi.updateTaskTitle(todolistId, taskId, '!!!!!!!!!!!!!!!')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
