import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { DomainTodolist, removeTodolistTC, updateTodolistTitleTC } from "../../../model/todolists-reducer"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskTC } from "../../../model/tasks-reducer"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useAppDispatch } from "../../../../../app/hooks/useAppDispatch"
import { DomainTask } from "../../../api/tasksApi.types"


type Props = {
  todoList: DomainTodolist
  tasks: DomainTask[]
}

export const TodoList = ({ todoList, tasks }: Props) => {
  const dispatch = useAppDispatch()

  const updateTodoListTitle = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todoList.id, title }))
  }

  const removeTodoList = () => {
    dispatch(removeTodolistTC(todoList.id))
  }

  const addTask = (title: string) => {
    dispatch(addTaskTC({ todolistId: todoList.id, title }))
  }

  return (
    <Paper elevation = {2} sx = {{ p: "20px" }}>
      <TodolistTitle
        title = {todoList.title}
        entityStatus = {todoList.entityStatus}
        updateTodoListTitle = {updateTodoListTitle}
        removeTodoList = {removeTodoList}
      />
      <AddItemForm addItem = {addTask} disabled = {todoList.entityStatus === "loading"}  />
      <Tasks todoListId = {todoList.id} tasks = {tasks} filter = {todoList.filter} disabled = {todoList.entityStatus === "loading"}/>
      <FilterTasksButtons todoListId = {todoList.id} filter = {todoList.filter} disabled = {todoList.entityStatus === "loading"}/>
    </Paper>
  )
}
