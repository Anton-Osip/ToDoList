import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
            <h3>
                <Button onClick = {removeTodolistHandler}>
                    <Delete color = {'secondary'}/>
                </Button>
                <EditableSpan title = {props.title}
                              onChange = {changeTodoListTitleHandler}/>
            </h3>
            <AddItemForm addItem = {addTask}/>
            {
                props.tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <div>
                        {props.tasks.map((task) => {

                            const removeTaskHandler = () => {
                                props.removeTask(props.todoListId, task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                props.changeTaskStatus(props.todoListId, task.id, newStatusValue)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(props.todoListId, task.id, newValue)
                            }

                            return <div key = {task.id} className = {task.isDone ? 'is-done' : ''}>
                                <Checkbox color="secondary" checked = {task.isDone} onChange = {changeTaskStatusHandler}/>

                                <Button onClick = {removeTaskHandler}>
                                    <Delete color = {'secondary'}/>
                                </Button>
                                <EditableSpan title = {task.title} onChange = {onChangeTitleHandler}/>

                            </div>
                        })}
                    </div>
            }
            <div>
                <Button variant = {props.filter === 'all' ? 'contained' : 'text'} color = {'secondary'}
                        onClick = {() => changeFilterTasksHandler('all')}>All</Button>
                <Button variant = {props.filter === 'active' ? 'contained' : 'text'} color = {'secondary'}
                        onClick = {() => changeFilterTasksHandler('active')}>Active</Button>
                <Button variant = {props.filter === 'completed' ? 'contained' : 'text'} color = {'secondary'}
                        className = {props.filter === 'completed' ? 'active-filter' : ''}
                        onClick = {() => changeFilterTasksHandler('completed')}>Completed</Button>
            </div>
        </div>
    )
}

