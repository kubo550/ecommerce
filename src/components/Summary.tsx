import { LineItem } from "@chec/commerce.js/types/line-item";
import type { FC } from "react";

interface SummaryProps {
    cartProducts: LineItem[] | null;
    totalPrice: string | null
}

export const Summary: FC<SummaryProps> = ({ cartProducts, totalPrice }) => {
    if (!cartProducts) return <div className=''>loading...</div>;
    return (
        <div className='w-full max-w-lg mx-auto'>
            <h3 className='font-bold md:text-xl mt-1 mb-4'>Order summary</h3>
            <hr className='my-3 ' />
            {cartProducts.map(item => (
                <div className='flex w-full mt-2 mb-3' key={item.id}>
                    <div className='flex-1'>
                        <p className='font-semibold'> {item.name} </p>
                        <p className='text-gray-700'>quantity: <span className="font-semibold"> {item.quantity}</span> </p>
                    </div>

                    <div className='px-1 pt-2 font-semibold'>
                        {item.price.formatted} zł
                    </div>
                </div>
            ))}
            <hr className='my-3 ' />
            <div className="my-2 flex w-full justify-between">
                <p className="font-semibold">Shipping</p> <p className="font-bold">Free</p>
            </div>
            <hr className='my-3' />
            <div className="mb-3 pl-2">
                <p>Total:  <b> {totalPrice || 0} zł </b> </p>
            </div>
        </div>
    );
};
