import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todolist-api";

export default {
    title: 'API/todoLists',
}
const config = {
    withCredentials: true,
    headers: {
        "API-KEY": '23007c70-d369-4578-ab95-a24535e880f8'

    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todoListApi.getTodolists()
        promise
            .then((response) => {
                setState(response.data)
                console.log(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const payload = {
        title: 'new todoList'
    }
    useEffect(() => {
        todoListApi.createTodolist(payload)
            .then((resp) => {
                setState(resp.data)
                console.log(resp.data)

            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const id = '9667f6fd-de5f-487c-80a1-e8fe6a4e9439'
    useEffect(() => {
        todoListApi.deleteTodolist(id)
            .then((resp) => {
                setState(resp.data)
                console.log(resp.data)

            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'bae92c31-0cce-46c5-bf5a-b04ab24fff9d'

    useEffect(() => {
        todoListApi.updateTodolistTitle(todolistId,'xz')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
