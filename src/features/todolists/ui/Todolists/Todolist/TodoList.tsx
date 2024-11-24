import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { DomainTodolist } from "../../../model/todolists-reducer"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { DomainTask } from "../../../api/tasksApi.types"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../api/todolistsApi"
import { useAddTaskMutation } from "../../../api/tasksApi"


type Props = {
  todoList: DomainTodolist
  tasks: DomainTask[]
}


export const TodoList = ({ todoList, tasks }: Props) => {
  const [updateTodolistTitle] = useUpdateTodolistMutation()
  const [removeTodolist] = useRemoveTodolistMutation()
  const [addTask] = useAddTaskMutation()

  const updateTodoListTitle = (title: string) => {
    updateTodolistTitle({ id: todoList.id, title })
  }

  const removeTodoList = () => {
    removeTodolist(todoList.id)
  }

  const addTaskHandler = (title: string) => {
    addTask({ title, id: todoList.id })
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
      <Tasks todoListId = {todoList.id} tasks = {tasks} filter = {todoList.filter}
             disabled = {todoList.entityStatus === "loading"} />
      <FilterTasksButtons todoListId = {todoList.id} filter = {todoList.filter}
                          disabled = {todoList.entityStatus === "loading"} />
    </Paper>
  )
}
