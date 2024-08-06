import {v1} from "uuid";
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todoLists-reducer";
import {FilterValuesType, TodolistType} from "../App";

test("correct todoList should be removed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)

})

test("correct todoList should be added", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodoListTitle = 'New todoLIst'

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')

})

test("correct todoList should change it's name", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodoListTitle = 'New todoLIst'

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistID2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)

})

test("correct Filter of todoList should be changed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: FilterValuesType = 'completed'


    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})
