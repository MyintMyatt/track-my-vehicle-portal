import { X } from "lucide-react";

export const AppFormInput = (
    { type = 'text',
        isTextArea = false,
        name,
        value,
        onChange,
        disabled,
        placeholder,
        className,
        register,
        rules = {},
        watch,
        setValue,
        error,
        child,
        ...props
    }
) => {

    const inputValue = watch?.(name);

    const handleClear = () => {
        setValue(name, '');
    }

    return (
        <div className={`flex relative ${className}`}>
            {!isTextArea ? <input
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                {...register(name, rules)}
                {...props}
                className={`
                w-full border  rounded-md px-3 py-2  text-slate-900 
                outline-none   transition
                ${error ? 'border-red-500 transition-all' : 'border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/50'}
                ${className}
                ${inputValue ? 'pr-8' : ''}
                ${disabled ? 'bg-slate-100' : 'bg-white'}
                `}
            >
            </input> :

                <textarea
                    id={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    rows={4}
                    {...register(name, rules)}
                    {...props}
                    className={`
                w-full border  rounded-md px-3 py-2  text-slate-900 
                outline-none   transition
                ${error ? 'border-red-500 transition-all' : 'border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/50'}
                ${className}
                ${inputValue ? 'pl-8' : ''}
                ${disabled ? 'bg-slate-100' : 'bg-white'}
                `}
                >
                </textarea>
            }
            {
                (!child && inputValue && !disabled) && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-700 hover:text-red-800"
                    >
                        <X size={16} />
                    </button>
                )
            }

            <div className="absolute right-3 top-2">
                {child}
            </div>

        </div>
    );
};

export const AppFormInputRow = ({
    label,
    isMandatoryField = false,
    child
}) => {
    return (
        <div className="w-full flex items-start gap-10 justify-around my-4">
            <span className="flex-1">{label} {isMandatoryField && <span className="text-red-500"> *</span>}</span>
            {child}
        </div>
    );
};


export const AppFormInputCol = ({
    title,
    child,
}) => {
    return (
        <div className="flex flex-col gap-2 min-w-0">
            <span>{title}</span>
            {child}
        </div>
    );
}