import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API',

}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Anton'})
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
        // Здесь мы будем делать запрос и ответ закидывать в стейт.
        // Который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const payload = {
        title: "Anton"
    }
    useEffect(() => {
        todolistsApi.createTodolist(payload)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = '79277f56-a743-4d88-81ba-ad183ee3ed9a'
    useEffect(() => {
        todolistsApi.deleteTodolist(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = 'b2e82660-5e3d-40f5-906d-b2d4bd337532'
    const payload = {
        title: "Osipchyk Anton"
    }
    useEffect(() => {
       todolistsApi.updateTodolistTitle(todoListId,payload)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
