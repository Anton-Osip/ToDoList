import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    todoListId: string
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newValue: string) => void
    changeTodoListTitle: (todoListId: string, newValue: string) => void
}

export const Todolist = (props: PropsType) => {
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todoListId, filter)
    }
    const removeTodolistHandler = () => {
        props.removeTodoList(props.todoListId)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }
    const changeTodoListTitleHandler = (value: string) => {
        props.changeTodoListTitle(props.todoListId, value)
    }

    return (
        <div>
            <h3><Button title = {'x'} onClick = {removeTodolistHandler}/><EditableSpan title = {props.title}
                                                                                       onChange = {changeTodoListTitleHandler}/>
            </h3>
            <AddItemForm addItem = {addTask}/>
            {
                props.tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {props.tasks.map((task) => {

                            const removeTaskHandler = () => {
                                props.removeTask(props.todoListId, task.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                props.changeTaskStatus(props.todoListId, task.id, newStatusValue)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(props.todoListId, task.id, newValue)
                            }

                            return <li key = {task.id} className = {task.isDone ? 'is-done' : ''}>
                                <input type = "checkbox" checked = {task.isDone} onChange = {changeTaskStatusHandler}/>
                                <EditableSpan title = {task.title} onChange = {onChangeTitleHandler}/>
                                <Button onClick = {removeTaskHandler} title = {'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className = {props.filter === 'all' ? 'active-filter' : ''} title = {'All'}
                        onClick = {() => changeFilterTasksHandler('all')}/>
                <Button className = {props.filter === 'active' ? 'active-filter' : ''} title = {'Active'}
                        onClick = {() => changeFilterTasksHandler('active')}/>
                <Button className = {props.filter === 'completed' ? 'active-filter' : ''} title = {'Completed'}
                        onClick = {() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}

