import {ButtonHTMLAttributes} from "react";


export const Button = ({title, onClick}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button onClick = {onClick}>{title}</button>
}
