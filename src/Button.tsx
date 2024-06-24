import React, {ButtonHTMLAttributes} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({title, onClick}: ButtonProps) => {
    return (<button onClick = {onClick}>{title}</button>)
}