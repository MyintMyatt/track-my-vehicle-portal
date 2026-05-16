import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";


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
                ${inputValue ? 'pr-8' : ''}
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
};

export const AppFormDropDown = ({
    name,
    value,
    disabled,
    placeholder,
    className,
    register,
    rules = {},
    error,
    options = [],
    ...props

}) => {
    return (
        <div className={`flex relative ${className}`}>
            <select
                id={name}
                disabled={disabled}
                {...register(name, rules)}
                {...props}
                className={`
                w-full border rounded-md px-3 py-2  text-slate-900 
                outline-none transition
                ${error ? 'border-red-500 transition-all' : 'border-slate-300 focus:border-slate-400 focus:ring-1 focus:ring-slate-300/50'}
                ${className}
                ${disabled ? 'bg-slate-100' : 'bg-white'}
                `}
            >
                <option value="" className="text-slate-300">{placeholder}</option>
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};


export const AppImagePicker = ({
    name,
    disabled,
    placeholder = "Click to upload photo",
    className,
    setValue,
    register,
    rules = {},
    error,
    watch,
    ...props
}) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    // Watch the file field from React Hook Form
    const fileList = watch?.(name);

    useEffect(() => {
        if (fileList && fileList.length > 0 && fileList[0] instanceof File) {
            const file = fileList[0];
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Cleanup memory on unmount or file change
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [fileList]);

    return (
        <div className={`flex flex-col w-full flex-2`}>
            {/* The Label acts as our clickable interactive container */}
            <label
                htmlFor={`file-input-${name}`}
                className={`
                    relative flex flex-col items-center justify-center w-full  ${ previewUrl ? className : 'min-h-[125px]'}
                    border-2 border-dashed rounded-xl cursor-pointer transition-all p-4
                    ${error ? 'border-red-500 bg-red-50/30' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 focus-within:border-indigo-500'}
                    ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}
                `}
            >
                {previewUrl ? (
                    /* image preview state */
                    <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay effect when hovering over an already selected image */}
                        {!disabled && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-white font-medium text-sm">
                                Change Photo
                            </div>
                        )}
                    </div>
                ) : (
                    /* Default Icon and text state */
                    <div className="flex flex-col items-center justify-center text-center gap-2 ">
                        <UploadCloud 
                            size={36} 
                            className={error ? "text-red-400" : "text-slate-400"} 
                        />
                        <span className={`text-sm font-medium ${error ? "text-red-500" : "text-slate-500"}`}>
                            {placeholder}
                        </span>
                        <span className="text-xs text-slate-400">Supporting images up to 5MB</span>
                    </div>
                )}

                {/* Completely hidden native input box */}
                <input
                    id={`file-input-${name}`}
                    type="file"
                    accept="image/*"
                    disabled={disabled}
                    {...register(name, rules)}
                    {...props}
                    className="hidden" 
                />
            </label>
        </div>
    );
};