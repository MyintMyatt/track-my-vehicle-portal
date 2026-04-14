
const AppTextInput = ({
    type = 'text',
    value,
    onChange,
    placeholder = ''
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="
                border border-slate-300 rounded-lg px-3 py-2
                bg-white text-slate-900
                outline-none
                focus:border-slate-600 focus:ring-2 focus:ring-slate-900/50
                transition
                "
        />
    );
};

export default AppTextInput;