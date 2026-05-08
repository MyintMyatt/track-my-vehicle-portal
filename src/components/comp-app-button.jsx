import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AppSubmitButton = ({
    name,
    type = "submit",
    onClick,
    loading = false,
    className
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`
            bg-indigo-600 p-3 rounded-md text-white hover:bg-indigo-700 
            ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}
            `}
        >
           {loading ? (
            <div className="flex justify-center items-center gap-2">
                <div className="border-white border-2 border-t-transparent animate-spin w-4 h-4 rounded-full">
                </div>
            Processing....
            </div>
           ) : (name)
           }
        </button>
    );
};

export const AppAddNewButton = ({
    text,
    icon,
    disabled = false,
    onClick
}) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={
            `flex gap-2 bg-indigo-600 w-fit p-3 px-5 rounded-md hover:bg-indigo-700 text-white cursor-pointer`
        }
        >
            <span>{text}</span>
            {icon}
        </button>
    );
};

export const AppBackButton = ({
    onClick
}) => {
    const navigate = useNavigate();
    return(
        <div
        className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 mb-5 cursor-pointer"
        onClick={() => navigate(-1)}>
            <ChevronLeft size={28}/>
            <span>Back</span>
        </div>
    );
}