import { FC } from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FormValue } from "types";

interface FormFieldProps {
    errors: DeepMap<FormValue, FieldError>;
    name: keyof FormValue;
    register: UseFormRegister<FormValue>;
    label: string
    placeholder?: string;
    small?: true
}

export const FormField: FC<FormFieldProps> = ({ errors, name, register, placeholder, label, small }) => (
    <div className={`w-full ${small ? "md:w-1/3" : "md:w-1/2"} px-3 mb-6 md:mb-0`}>
        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
            {label}
            <input
                {...register(name)}
                name={name}
                className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors[name] ? "border-red-500" : "border-gray-200"
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                type='text'
                placeholder={placeholder}
            />
        </label>

        {errors[name] && (
            <p className='text-red-500 text-xs italic'>{errors[name]?.message}</p>
        )}
    </div>
);

