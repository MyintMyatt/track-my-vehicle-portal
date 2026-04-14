const AppSubmitButton = ({
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
            bg-indigo-600 min-w-full p-3 rounded-md text-white hover:bg-indigo-700 
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

export default AppSubmitButton;