import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { baseApi } from "../../../app/baseApi"

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }

        return {
          method: "GET",
          url: `todo-lists/${todolistId}/tasks`,
          params
        }
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
            ...res.items.map(({ id }) => ({ type: "Task", id }) as const),
            { type: "Task", id: todolistId }
          ]
          : ["Task"]
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string, title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title }
        }
      },
      invalidatesTags: (res, err, { todolistId }) => [{ type: "Task", id: todolistId }]
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          method: "DELETE",
          url: `todo-lists/${todolistId}/tasks/${taskId}`
        }
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }]
    }),
    updateTask: build.mutation<BaseResponse, { taskId: string, todolistId: string, model: UpdateTaskModel }>({
      query: ({ taskId, todolistId, model }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: { ...model }
        }
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Task", id: taskId }]
    })
  })
})

export const {
  useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation
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
