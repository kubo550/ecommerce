import type { Live } from "@chec/commerce.js/types/live";
import type { FC } from "react";

interface SummaryProps {
    cart: Live | null;
}

export const Summary: FC<SummaryProps> = ({ cart }) => {
    if (!cart) return <div className=''>loading...</div>;
    return (
        <div className='w-full max-w-lg'>
            <h3 className='font-bold mt-1 mb-4'>Order summary</h3>
            {cart.line_items.map(item => (
                <div className='flex w-full mt-2 mb-3' key={item.id}>
                    {/* img */}

                    <div className='flex-1'>
                        <p className='font-semibold'> {item.name} </p>
                        <p className='text-gray-700'>quantity: {item.quantity}</p>
                    </div>

                    <div className='px-1 pt-2 font-semibold'>

                        {item.price.formatted} zł
                    </div>
                </div>
            ))}
            <div className=''>
                <p>Total </p> <b> {cart.subtotal.formatted} zł </b>
                <hr className='mt-2 mb-4' />
            </div>
        </div>
    );
};
