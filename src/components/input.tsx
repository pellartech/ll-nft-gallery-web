import React, { ReactElement } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
    type: 'text' | 'textarea';
    label?: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    register: UseFormRegister<any>;
    error?: string;
    additionalProps?: any;
    icon?: ReactElement;
}

const Input: React.FC<InputProps> = ({
    type,
    label,
    name,
    placeholder = '',
    defaultValue = '',
    register,
    error,
    additionalProps,
    icon,
}) => {
    return (
        <div className="sm:col-span-4 mt-4">
            {label &&
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            }
            <div className="mt-2 relative">
                {type === 'text' ? (
                    <>
                        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
                        <input
                            type="text"
                            {...register(name)}
                            defaultValue={defaultValue}
                            className={`bg-dark-90 placeholder:text-dark-90 block w-full rounded-md border-0 p-2 text-sm ${icon ? "pl-10" : ""}`}
                            placeholder={placeholder}
                            {...additionalProps}
                        />
                    </>
                ) : (
                    <textarea
                        rows={3}
                        {...register(name)}
                        defaultValue={defaultValue}
                        className="bg-dark-90 placeholder:text-dark-90 block w-full rounded-md border-0 p-2 text-sm"
                        {...additionalProps}
                    />
                )}
                {error && <p className="mt-2 text-error">{error}</p>}
            </div>
        </div>
    );
};

export default Input;
