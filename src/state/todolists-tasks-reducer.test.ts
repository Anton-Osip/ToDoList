import {TasksStateType, TodolistType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import {v1} from "uuid";

let startTasksState: TasksStateType
let startTodolistsState: Array<TodolistType>

beforeEach(() => {
    startTasksState = {};
    startTodolistsState = [];
})

test('ids should be equals', () => {

    const action = addTodolistAC("new todolist", v1());
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
