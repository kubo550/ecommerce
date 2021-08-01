import type { FC } from "react";

interface FormWrapperProps {
    step: number;
    totalSteps: number;
}
export const FormWrapper: FC<FormWrapperProps> = ({ children, step, totalSteps }) => {
    return (
        <div className='min-h-full bg-green-900 pb-20 flex flex-col items-start mt-4 text-gray-900 antialiased relative'>
            <div
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
                    height: "34rem",
                }}
                className='absolute bg-green-800 inset-x-0 top-0'
            />
            <div className='mx-auto z-10 mt-8 text-center'>
                <h1 className='text-white text-5xl font-semibold'>
                    Shipping <span className='text-yellow-500'>Details</span>
                </h1>
                <p className='text-green-200 mt-2'>
                    Become a new member in 3 easy steps
                </p>
            </div>
            <div className='max-w-xl w-full mt-8 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10'>
                <div className='h-2 bg-gray-200 w-full overflow-hidden'>
                    <div
                        style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        className='h-full bg-yellow-400 transform duration-300 ease-out'
                    />
                </div>
                <div className='px-16 py-6'>{children}</div>
            </div>
        </div>
    );
};
