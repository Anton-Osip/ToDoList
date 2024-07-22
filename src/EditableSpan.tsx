import {ChangeEvent, useState} from "react";

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

    return editMode ? <input value = {title} onBlur = {activateViewMode} autoFocus onChange = {onChangeTitleHandler}/> :
        <span onDoubleClick = {activateEditeMode}>{props.title}</span>
}