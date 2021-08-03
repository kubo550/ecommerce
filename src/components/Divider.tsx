import { FC } from "react"

export const Divider: FC = ({ children }) => {
    return (
        <div className="flex flex-row justify-center items-center my-4">
            <div className="flex-1 h-2 rounded-l-lg bg-gradient-to-tr from-gray-300 text-yellow-200" />
            <span className="italic mx-3"> {children} </span>
            <div className="flex-1 h-2 rounded-r-lg bg-gradient-to-bl from-gray-300 text-yellow-200" />
        </div>
    )
}
