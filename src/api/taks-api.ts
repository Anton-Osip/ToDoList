import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": '23007c70-d369-4578-ab95-a24535e880f8'
    }
})

export const taskApi = {
    getTasks: (todoListId: string) => {
        return instance.get<ResponseType<TaskType[]>>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask: (todoListId: string, payload: { title: string }) => {
        return instance.post<ResponseType>(`/todo-lists/${todoListId}/tasks`, payload)
    },
    deleteTask: (todoListId: string, taskId: string) => {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTaskTitle: (todoListId: string, taskId: string, title: string) => {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, {title})
    }
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: number
    deadline: number
    id: string
    todoListId: string
    order: number
    addedDate: number
}


type ResponseType<D = {}> = {
    error: string
    totalCount: number
    items: D
}


