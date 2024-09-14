import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import {useAddItemForm} from "./hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {

    const {
        title,
        error,
        onChangeHandler,
        onKeyPressHandler,
        addItem
    } = useAddItemForm(props.addItem)

    return <div>
        <TextField variant = "outlined"
                   error = {!!error}
                   value = {title}
                   onChange = {onChangeHandler}
                   onKeyPress = {onKeyPressHandler}
                   label = "Title"
                   helperText = {error}
        />
        <IconButton color = "primary" onClick = {addItem}>
            <AddBox/>
        </IconButton>
    </div>
})

