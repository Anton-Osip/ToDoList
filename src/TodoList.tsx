import React from "react";
import {Task} from "./Task";
import {FilterValue} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
};

type Props = {
    title: string
    tasks: TaskProps[]
    filter: FilterValue
    todoListId: string
    removeTasks: (todolistId: string, taskId: string) => void
    filterTasks: (todoListId: string, filter: FilterValue) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
    updateTodoListTitle: (todolistId: string,title: string) => void
}

export const TodoList = (props: Props) => {
    const {
        title,
        tasks,
        filter,
        todoListId,
        removeTasks,
        filterTasks,
        addTask,
        changeTaskStatus,
        removeTodoList,
        updateTaskTitle,
        updateTodoListTitle
    } = props;


    const changeFilterHandler = (filter: FilterValue) => {
        filterTasks(todoListId, filter)
    }
    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }
    const addTaskCallback = (title: string) => {
        addTask(todoListId, title)
    }
    const updateTodoListTitleHandler = (title: string) => {
        updateTodoListTitle(todoListId, title)
    }


    let filteredTasks = tasks
    if (filter === 'Active') filteredTasks = tasks.filter((task: TaskProps) => !task.isDone)
    if (filter === 'Completed') filteredTasks = tasks.filter((task: TaskProps) => task.isDone)

    const mappedTasks = filteredTasks.length ? filteredTasks.map(task => {
        return <Task key = {task.id} {...task} todoListId = {todoListId} removeTasks = {removeTasks}
                     changeTaskStatus = {changeTaskStatus} updateTaskTitle = {updateTaskTitle}/>
    }) : <div>Нет данных</div>

    return (
        <div>
            <h3><EditableSpan value={title} onChange={updateTodoListTitleHandler}/>
                <Button
                    onClick = {removeTodoListHandler}
                    title = {"X"}/>
            </h3>
            <AddItemForm addItem = {addTaskCallback}/>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                {/*<button onClick = {() => changeFilterHandler('All')}>All</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Active')}>Active</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Completed')}>Completed</button>*/}
                <Button onClick = {() => changeFilterHandler('All')}
                        title = {'All'}
                        className = {filter === 'All' ? 'active-filter' : ''}/>
                <Button onClick = {() => changeFilterHandler('Active')}
                        title = {'Active'}
                        className = {filter === 'Active' ? 'active-filter' : ''}/>
                <Button onClick = {() => changeFilterHandler('Completed')}
                        title = {'Completed'}
                        className = {filter === 'Completed' ? 'active-filter' : ''}/>
            </div>
        </div>
    )
}
