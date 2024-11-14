import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type PropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = ({addItem}: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const buttonStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return (
        <Box sx = {{display: 'flex'}}>
            <TextField
                error = {!!error}
                label = {!!error ? error : 'Enter text ...'}
                variant = "outlined"
                color = "primary"
                size = "small"
                value = {title}
                onChange = {changeItemHandler}
                onKeyUp = {addItemOnKeyUpHandler}
            />

            <Button onClick = {addItemHandler}
                    color = "primary"
                    variant = "contained"
                    style = {buttonStyle}
            >+</Button>
        </Box>
    )
}
