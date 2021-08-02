import Link from "next/link";
import { FC } from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FormValue } from "types";
import { FormField } from "./FormField";

interface ShippingAddressProps {
    errors: DeepMap<FormValue, FieldError>;
    register: UseFormRegister<FormValue>;
    isValid: boolean;
    nextStep: () => void;
}

export const ShippingAddress: FC<ShippingAddressProps> = ({ errors, register }) => (
    <>
        <h3 className='text-center text-xl mt-1 mb-4'> Shipping address </h3>
        <div className='flex flex-wrap -mx-3 mb-6'>
            <FormField
                name='firstname'
                label='First Name'
                placeholder='John'
                errors={errors}
                register={register}
            />
            <FormField
                name='lastname'
                label='Last Name'
                placeholder='Doe'
                errors={errors}
                register={register}
            />
            <FormField
                name='phone'
                label='Phone'
                placeholder='537291461'
                errors={errors}
                register={register}
            />
            <FormField
                name='email'
                label='E-mail Aress'
                placeholder='name@example.com'
                errors={errors}
                register={register}
            />
        </div>

        <div className='flex flex-wrap -mx-3 mb-2'>
            <FormField
                name='address1'
                label='Adress'
                placeholder='St. Patrick 45'
                errors={errors}
                register={register}
                small
            />
            <FormField
                name='zip'
                label='ZIP / Postal code'
                placeholder='32-065'
                errors={errors}
                register={register}
                small
            />
            <FormField
                name='city'
                label='city'
                placeholder='Moscow'
                errors={errors}
                register={register}
                small
            />
        </div>

        <div className='w-full flex justify-between px-4 mt-4 mb-2'>
            <Link href='/cart' passHref>
                <button className='px-3 py-2'>Back to cart</button>
            </Link>
            <button className='px-3 py-2' type='submit'>
                NEXT
            </button>
        </div>
    </>
);
