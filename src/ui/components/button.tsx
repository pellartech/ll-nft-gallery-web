import { useState, ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({ children, loading = false, disabled = false, onClick, type = 'button' }: ButtonProps) => {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            className={`w-full bg-white text-black font-semibold rounded-lg p-3 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={isDisabled}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
