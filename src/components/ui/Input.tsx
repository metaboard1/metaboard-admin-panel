import React, { FC } from "react";

interface InputProps {
    renderType?: 'input' | 'textarea'
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string; // Optional hint text
    renderLeftIcon?: React.ReactElement;
    renderRightIcon?: React.ReactElement;
}

const Input: FC<InputProps> = ({
    renderType = 'input',
    type = "text",
    id,
    name,
    placeholder,
    value,
    defaultValue,
    onChange,
    className = "",
    min,
    max,
    step,
    disabled = false,
    success = false,
    error = false,
    hint,
    renderLeftIcon,
    renderRightIcon,
    ...rest
}) => {
    let inputClasses = `block w-full py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm bg-transparent ${className}`;

    let containerClasses = "relative rounded-md bg-white pl-3 outline-1 -outline-offset-1";

    if (disabled) {
        inputClasses += ` text-gray-500 cursor-not-allowed dark:text-gray-400`;
        containerClasses += ` outline-gray-300 bg-gray-50 dark:bg-gray-800`;
    } else if (error) {
        inputClasses += ` text-error-800 dark:text-error-400`;
        containerClasses += ` outline-error-500 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-500 has-[input:focus-within]:shadow-lg has-[input:focus-within]:shadow-blue-500/10`;
    } else if (success) {
        inputClasses += ` text-success-500 dark:text-success-400`;
        containerClasses += ` outline-success-400 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-500 has-[input:focus-within]:shadow-lg has-[input:focus-within]:shadow-blue-500/10`;
    } else {
        inputClasses += ` dark:text-white/90 dark:placeholder:text-white/30`;
        containerClasses += ` outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-500 has-[input:focus-within]:shadow-lg has-[input:focus-within]:shadow-blue-500/10 dark:bg-gray-900`;
    }

    return (
        <div>
            <div className={`flex items-center gap-2 ${containerClasses}`}>
                {
                    React.isValidElement(renderLeftIcon) && renderLeftIcon
                }
                {
                    renderType === 'input' &&
                    <input
                        type={type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        className={inputClasses}
                        {...rest}
                    />
                }
                {
                    renderType === 'textarea' &&
                    <textarea
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        disabled={disabled}
                        className={inputClasses}
                        {...rest}
                    />
                }
                {
                    React.isValidElement(renderRightIcon) && renderRightIcon
                }
            </div>

            {/* Optional Hint Text */}
            {hint && (
                <p
                    className={`mt-1.5 text-xs ${error
                        ? "text-error-500"
                        : success
                            ? "text-success-500"
                            : "text-gray-500"
                        }`}
                >
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Input;