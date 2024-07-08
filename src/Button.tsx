import React from "react";
import {FilteredType} from "./App";

type ButtonProps = {
    title: string
    onClick: () => void
    filter?: FilteredType
};

export const Button = ({title, onClick, filter}: ButtonProps) => {
    const onClickHandler = () => {
        onClick()
    }

    return (<button className = {filter === title ? 'active-filter' : ''} onClick = {onClickHandler}>{title}</button>)
}