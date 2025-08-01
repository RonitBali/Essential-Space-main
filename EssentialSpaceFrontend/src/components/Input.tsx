import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, ...props }, ref) => {
  return (
    <input
      {...props}
      type="text"
      placeholder={placeholder}
      ref={ref}
      className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
    />
  );
});

Input.displayName = "Input";