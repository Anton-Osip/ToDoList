import React from "react"
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import {
  changeTodoListTitle,
  removeTodolistAC,
  Todolist,
} from "../../../model/todolists-reducer"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC } from "../../../model/tasks-reducer"
import { Tasks } from "./Tasks/Tasks"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { useAppDispatch } from "../../../../../app/hooks/useAppDispatch"

export type TaskProps = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  todoList: Todolist
  tasks: TaskProps[]
}

export const TodoList = ({ todoList, tasks }: Props) => {
  const dispatch = useAppDispatch()

  const updateTodoListTitle = (title: string) => {
    dispatch(changeTodoListTitle({ todoListId: todoList.id, title }))
  }

  const removeTodoList = () => {
    dispatch(removeTodolistAC({ todoListId: todoList.id }))
  }

  const addTask = (title: string) => {
    dispatch(addTaskAC({ todolistId: todoList.id, title }))
  }

  return (
    <Paper elevation={2} sx={{ p: "20px" }}>
      <TodolistTitle
        title={todoList.title}
        updateTodoListTitle={updateTodoListTitle}
        removeTodoList={removeTodoList}
      />
      <AddItemForm addItem={addTask} />
      <Tasks todoListId={todoList.id} tasks={tasks} filter={todoList.filter} />
      <FilterTasksButtons todoListId={todoList.id} filter={todoList.filter} />
    </Paper>
  )
}
