import { Todolist } from "./todolistsApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { DomainTodolist } from "../model/todolists-reducer"
import { baseApi } from "../../../app/baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: build => (
    {
      getTodolists: build.query<DomainTodolist[], void>({
        query: () => "todo-lists",
        providesTags: ["Todolist"],
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map(tl => ({ ...tl, filter: "All", entityStatus: "idle" }))
        }
      }),
      addTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title }
          }
        },
        invalidatesTags: ["Todolist"]
      }),
      updateTodolist: build.mutation<BaseResponse, { id: string, title: string }>({
        query: ({ id, title }) => {
          return {
            url: `todo-lists/${id}`,
            method: "PUT",
            body: { title }
          }
        },
        invalidatesTags: ["Todolist"]
      }),
      removeTodolist: build.mutation<BaseResponse, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: `todo-lists/${id}`
          }
        },
        invalidatesTags: ["Todolist"]
      })
    }
  )
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useUpdateTodolistMutation,
  useRemoveTodolistMutation
} = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>("todo-lists", {})
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title }, {})
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>(
      "todo-lists",
      { title },
      {}
    )
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`, {})
  }
}
