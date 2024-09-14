import {ChangeEvent, KeyboardEvent, useState} from "react";

export type useAddItemFormType = {
    title: string
    error: string | null
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
    addItem: () => void
}

export const useAddItemForm = (onItemAdded: (title: string) => void):useAddItemFormType => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            onItemAdded(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }
    return {title, error, onChangeHandler, onKeyPressHandler, addItem}
}
