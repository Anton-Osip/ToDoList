import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../api/todolistsApi"
import { useAddTaskMutation } from "../../../api/tasksApi"
import { RequestStatus } from "../../../../../app/app-reducer"
import { useAppDispatch } from "../../../../../app/hooks/useAppDispatch"
import { DomainTodolist } from "../../../lib/types/types"


type Props = {
  todoList: DomainTodolist
}


export const TodoList = ({ todoList }: Props) => {
  const [updateTodolistTitle] = useUpdateTodolistMutation()
  const [removeTodolist] = useRemoveTodolistMutation()
  const [addTask] = useAddTaskMutation()
  const dispatch = useAppDispatch()
  const updateTodoListTitle = (title: string) => {
    updateTodolistTitle({ id: todoList.id, title })
  }

  const addTaskHandler = (title: string) => {
    addTask({ title, todolistId: todoList.id })
  }

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, state => {
        const index = state.findIndex(tl => tl.id === todoList.id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      })
    )
  }

  const removeTodoList = () => {
    updateQueryData("loading")
    removeTodolist(todoList.id)
      .unwrap()
      .catch(() => {
        updateQueryData("idle")
      })
  }

  return (
    <Paper elevation = {2} sx = {{ p: "20px" }}>
      <TodolistTitle
        title = {todoList.title}
        entityStatus = {todoList.entityStatus}
        updateTodoListTitle = {updateTodoListTitle}
        removeTodoList = {removeTodoList}
      />
      <AddItemForm addItem = {addTaskHandler} disabled = {todoList.entityStatus === "loading"} />
      <Tasks todoListId = {todoList.id}  filter = {todoList.filter}
             disabled = {todoList.entityStatus === "loading"} />
      <FilterTasksButtons todoListId = {todoList.id} filter = {todoList.filter}
                          disabled = {todoList.entityStatus === "loading"} />
    </Paper>
  )
}
