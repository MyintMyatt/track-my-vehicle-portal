export const AppFormInput = (
    { type = 'text',
        value,
        onChange,
        placeholder,
        className }
) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-900 
                outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300/50 transition
                ${className}
                `}
        >
        </input>
    );
}

export const AppFormInputRow = ({
    label,
    isMandatoryField = false,
    type = 'text',
    value,
    onChange,
    placeholder,
    className
}) => {
    return(
        <div className="w-full flex items-center gap-10 justify-around my-4">
            <span className="flex-1">{label} { isMandatoryField && <span className="text-red-500"> *</span>}</span>
            <AppFormInput  
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className} />
        </div>
    );
}