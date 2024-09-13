import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": '23007c70-d369-4578-ab95-a24535e880f8'
    }
})
export const todoListApi = {
    getTodolists: () => {
        return instance.get<ResponseType<TodolistType[]>>('/todo-lists')
    },
    createTodolist: (payload: { title: string }) => {
        return instance.post<ResponseType>('/todo-lists', payload)
    },
    deleteTodolist: (id: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    updateTodolistTitle: (todolistId: string, title: string) => {
        return axios.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}


