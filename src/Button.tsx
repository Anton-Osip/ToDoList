import React, {ButtonHTMLAttributes} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button=({title}:ButtonProps)=>{
    return (<button>{title}</button>)
}