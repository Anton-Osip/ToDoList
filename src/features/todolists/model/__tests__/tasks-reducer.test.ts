import {
  addTask,
  removeTask,
  tasksReducer, TasksState, updateTask
} from "../tasks-reducer"
import { v1 } from "uuid"
import { UpdateTaskModel } from "../../api/tasksApi.types"
import { addTodolist, removeTodolist } from "../todolists-reducer"

let todolistId1: string
let todolistId2: string
let startState: TasksState = {}

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    todolistId1: [
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "1",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId1
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "2",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 2,
        title: "JS",
        todoListId: todolistId1
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId1
      }
    ],
    todolistId2: [
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "1",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId2
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "2",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 2,
        title: "JS",
        todoListId: todolistId2
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId2
      }
    ]
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(
    startState,
    removeTask({ todolistId: "todolistId2", taskId: "2" })
  )

  expect(endState).toEqual({
    todolistId1: [
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "1",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId1
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "2",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 2,
        title: "JS",
        todoListId: todolistId1
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId1
      }
    ],
    todolistId2: [
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "1",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId2
      },
      {
        addedDate: "2024-11-15T15:00:14.947",
        deadline: "null",
        description: "null",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "GIT",
        todoListId: todolistId2
      }
    ]
  })
})

test("status of specified task should be changed", () => {

  const model: UpdateTaskModel = {
    status: 0,
    title: "",
    deadline: "",
    description: "",
    priority: 3,
    startDate: ""
  }

  const endState = tasksReducer(
    startState,
    updateTask({ todolistId: "todolistId2", taskId: "2", domainModel: model })
  )

  expect(endState["todolistId1"][1].status).toBe(2)
  expect(endState["todolistId2"][1].status).toBe(0)
})

test("title of specified task should be changed", () => {

  const model: UpdateTaskModel = {
    status: 0,
    title: "newTitle",
    deadline: "",
    description: "",
    priority: 3,
    startDate: ""
  }

  const endState = tasksReducer(
    startState,
    updateTask({ todolistId: "todolistId2", taskId: "2", domainModel: model })
  )

  expect(endState["todolistId2"][0].title).toBe("GIT")
  expect(endState["todolistId2"][1].title).toBe("newTitle")
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolist({
      todolist: {
        id: v1(),
        title: "",
        addedDate: "string",
        order: 3
      }
    })
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ id: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})
