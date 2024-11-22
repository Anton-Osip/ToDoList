import {
  addTodolist,
  changeTodoListFilter, changeTodolistTitle,
  DomainTodolist, removeTodolist,

  todolistsReducer
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", addedDate: "", order: 0, filter: "All", entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", addedDate: "", order: 0, filter: "All", entityStatus: "idle" }
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(
    startState,
    removeTodolist({ id: todolistId1 })
  )

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTodoListId: DomainTodolist = { id: v1(), title: "New Todolist", addedDate: "", order: 0, filter: "All" ,entityStatus:"idle"}

  const endState = todolistsReducer(
    startState,
    addTodolist({ todolist: newTodoListId })
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New Todolist")
})

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistTitle({ id: todolistId2, title: "New Todolist" })
  )

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodoListFilter({ id: todolistId2, filter: "Completed" })
  )

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe("Completed")
})
