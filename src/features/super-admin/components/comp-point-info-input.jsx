import { AppFormInput, AppFormInputCol } from "../../../components/comp-form-input";

export const PointInfoInput = ({
    title,
    name,
    placeholder,
    register,
    rules = {},
    watch,
    setValue,
    errors,
    child
}) => {
    return (
        <AppFormInputCol
            title={title}
            child={
                <AppFormInput
                    name={name}
                    placeholder={placeholder}
                    register={register}
                    rules={rules}
                    watch={watch}
                    setValue={setValue}
                    error={errors}
                    child={child}
                />
            }
        />
    );
};