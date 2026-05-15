import { AppFormInput, AppFormInputRow } from "../../../../components/comp-form-input";

const CarInfoStep = ({
    register,
    watch,
    setValue,
    errors,
    fields,
    append,
    remove
}) => {
    return (
        <div className="space-y-6">
            {
                fields.map((item, index) => (
                    <div key={item.id} className="border border-slate-200 rounded-md p-5">
                        <div className="flex justify-between">
                            <h2 className="font-medium text-xl">Car Info And Specification</h2>
                            <h2 className="font-medium bg-indigo-300 text-white p-1 px-5 rounded-full">Car {index + 1}</h2>
                        </div>
                        <AppFormInputRow
                            label={`Car License Number`}
                            isMandatoryField={true}
                            child={
                                <AppFormInput
                                    name={`car.${index}.license_number`}
                                    placeholder={'Enter car license number'}
                                    className={'flex-2'}
                                    register={register}
                                    rules={{
                                        required: 'car license number is required'
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors.car?.[index].license_number}
                                />
                            }
                        />

                        <AppFormInputRow 
                            label={`Car License Photo`}
                            isMandatoryField={true}
                            child={
                                <AppFormInput
                                    type='file'
                                    name={`car.${index}.license_photo`}
                                    placeholder={'Enter car license photo'}
                                    className={'flex-2'}
                                    register={register}
                                    rules={{
                                        required: 'car license photo is required'
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors.car?.[index].license_photo}
                                />
                            }
                        />

                        {/* car model */}
                        <AppFormInputRow
                            label={`Car Model`}
                            isMandatoryField={true}
                            child={
                                <AppFormInput
                                    name={`car.${index}.model`}
                                    placeholder={'Enter car model'}
                                    className={'flex-2'}
                                    register={register}
                                    rules={{
                                        required: 'car model is required'
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors.car?.[index].model}
                                />
                            }
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default CarInfoStep;