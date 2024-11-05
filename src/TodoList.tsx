import React from "react";
import {Task} from "./Task";
import {Button} from "./Button";

export type TaskProps = {
    id: number
    title: string
    isDone: boolean
};

type Props = {
    title: string
    tasks: TaskProps[]
}

export const TodoList = (props: Props) => {
    const {title, tasks} = props;

    const mappedTasks = tasks.length ? tasks.map(task => {
        return <Task key = {task.id} {...task}/>
    }) : <div>Нет данных</div>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <Button title = {'All'}/>
                <Button title = {'Active'}/>
                <Button title = {'Completed'}/>
            </div>
        </div>
    )
}
