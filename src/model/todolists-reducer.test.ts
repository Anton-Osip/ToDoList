import {
    addTodolistAC,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from 'uuid'
import {Todolist} from '../App'

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let newTodoListId = v1()

    const endState = todolistsReducer(startState, addTodolistAC('New Todolist', newTodoListId))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
})
test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeTodoListTitle(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeTodoListFilter(todolistId2, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})
