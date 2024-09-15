import axios from "axios";

export type TodoListsType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodoListResponseType<T={}> = {
    resultCode: number
    message: string[]
    data: T
}


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f913b721-10d5-4f0b-ade1-aa7838431971'
    }
}

export const todolistsApi = {
    getTodolists: () => {
        return axios.get<Array<TodoListsType>>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)

        // Здесь мы будем делать запрос и ответ закидывать в стейт.
        // Который в виде строки будем отображать в div-ке
    },

    createTodolist: (payload: { title: string }) => {

        return axios.post<TodoListResponseType<{item:TodoListsType}>>('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings)


    },

    deleteTodolist: (todoListId: string) => {

        return axios.delete<TodoListResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)

    },

    updateTodolistTitle: (todoListId: string, payload: { title: string }) => {

        return axios.put<TodoListResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, payload, settings)

    }
}
