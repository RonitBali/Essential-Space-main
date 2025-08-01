import type { ReactElement } from "react";

type variants = "primary" | "secondary";

export interface ButtonProps { 
    variant:variants;
    size: "sm" | "mb" | "lg" ;
    text:string;
    endIcon?: ReactElement;
    onClick?: ()=>void;
    startIcon?: ReactElement ;
    classname? : string;
}

const defaultStyles = "font-semibold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl";

const sizeStyles = {
    "lg": "px-8 py-4 text-lg rounded-2xl",
    "mb": "px-6 py-3 text-base rounded-xl",
    "sm": "px-4 py-2 text-sm rounded-lg",
}

const variantStyles = {
    "primary": "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0",
    "secondary": "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300",
}

export const Button = ({
    variant,
    size,
    text,
    endIcon,
    onClick,
    startIcon,
    classname
}: ButtonProps) => {
    return (
        <button
            className={`
                ${defaultStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${classname}
            `}
            onClick={onClick}
        >
            {startIcon && <span>{startIcon}</span>}
            <span>{text}</span>
            {endIcon && <span>{endIcon}</span>}
        </button>
    );
}