import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (text: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditedMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditeMode = () => {
        setEditedMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditedMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return editMode ? <TextField
            value = {title}
            label = "Type value"
            variant = "standard"
            color = {'secondary'}
            onBlur = {activateViewMode} autoFocus onChange = {onChangeTitleHandler}
        /> :
        <span onDoubleClick = {activateEditeMode}>{props.title}</span>
}