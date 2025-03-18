import { ChangeEvent, FC, useState } from "react";

interface IInputProps {
    label: string
    value: string
    name: string
    type?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    
}

export const Input:FC<IInputProps> = ({onChange, value, label, name, type = 'text'}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-64">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={(e) => onChange(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value !== "")}
                className="w-full p-3 border-2 border-gray-300 rounded-md text-lg outline-none transition-all focus:border-blue-500"
            />
            <label
                htmlFor={name}
                className={`absolute left-3 px-1 text-gray-500 transition-all z-2 bg-white ${isFocused || value ? "-top-2 text-xs text-blue-500" : "top-1/2 transform -translate-y-1/2 text-lg"}`}
            >
                {label}
            </label>
        </div>
    );
};
