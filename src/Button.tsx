import {ButtonHTMLAttributes} from "react";


export const Button = ({title}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button>{title}</button>
}
