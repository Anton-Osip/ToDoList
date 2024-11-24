import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { baseApi } from "../../../app/baseApi"


export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, string>({
      query(id) {
        return {
          url: `todo-lists/${id}/tasks`,
          method: "GET"
        }
      },
      providesTags: ["Task"]
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { id: string, title: string }>({
      query: ({ id, title }) => {
        return {
          url: `todo-lists/${id}/tasks`,
          method: "POST",
          body: { title }
        }
      },
      invalidatesTags: ["Task"]
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          method: "DELETE",
          url: `todo-lists/${todolistId}/tasks/${taskId}`
        }
      },
      invalidatesTags: ["Task"]
    }),
    updateTask: build.mutation<BaseResponse, { taskId: string, todolistId: string, model: UpdateTaskModel }>({
      query: ({ taskId, todolistId,model }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: { ...model }
        }
      },
      invalidatesTags: ["Task"]
    })
  })
})

export const {
  useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation,useUpdateTaskMutation
} = tasksApi

export const _tasksApi = {
  getTasks(id: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`, {})
  },
  updateTaskTitle(payload: {
    todolistId: string
    taskId: string
    model: UpdateTaskModel
  }) {
    const { model, todolistId, taskId } = payload

    return instance.put<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
      {}
    )
  },
  changeTaskStatus(payload: {
    todolistId: string
    taskId: string
    model: UpdateTaskModel
  }) {
    const { model, todolistId, taskId } = payload
    return instance.put<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
      {}
    )
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      {}
    )
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
      {}
    )
  }
}
