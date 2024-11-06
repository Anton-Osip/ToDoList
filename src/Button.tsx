import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    title: string
    onClick: () => void
    className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick, className}: ButtonPropsType) => {
    return <button className = {className} onClick = {onClick}>{title}</button>
}
