import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (<div>
            <TextField
                label = "Type value"
                variant = "standard"
                color = {'secondary'}
                value = {title}
                onChange = {changeTaskTitleHandler}
                onKeyUp = {addTaskOnKeyUpHandler} error = {!!error} helperText = {error}
            />


            <Button onClick = {addTaskHandler} variant = {'text'} color = {'secondary'}>
                <ControlPoint/>
            </Button>
        </div>
    )
}