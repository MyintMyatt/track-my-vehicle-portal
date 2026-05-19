import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { AppMeduimTitle } from "../../../../components/comp-app-titles";
import { AppFormDropDown, AppFormInput, AppFormInputRow, AppImagePicker } from "../../../../components/comp-form-input";
import { DistanceUnit } from "../../../../constants/distance-unit";
import { useState } from "react";

const CarInfoStep = ({
    register,
    watch,
    setValue,
    errors,
    fields,
    append,
    remove,
    distanceUnitOptions,
    genderOptions
}) => {

    const [collapsedIndexes, setCollapsedIndexes] = useState([]);

    const handleCollapsed = (index) => {
        setCollapsedIndexes((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            }
            return [...prev, index];
        });
    };

    const handleDelete = (index, itemId) => {
        remove(index);
        setCollapsedIndexes((prev) =>
            prev.filter((id) => id !== itemId)
        );
    };

    return (
        <div className="space-y-6">
            {
                fields.map((item, index) => (
                    <div
                        key={item.id}
                        className="border rounded-2xl p-6 px-4 border-slate-200 overflow-hidden transition-all duration-500 ease-in-out"
                    >
                        <div className={`
                                transition-all duration-500 ease-in-out
                                overflow-hidden
                                ${collapsedIndexes.includes(item.id)
                                ? 'max-h-[45px]'
                                : 'max-h-[5000px]'
                            }
                            `}>

                            <div className="flex justify-between items-center my-2">
                                <div className="flex gap-2 items-center">
                                    <h2 className="font-medium text-black bg-slate-200 px-3 py-1 rounded-full">{index + 1}</h2>
                                    <AppMeduimTitle text={`Ferry Car `} />
                                    <span className="text-indigo-500">{collapsedIndexes.includes(item.id) ? watch?.(`car_infos.${index}.driver_info.name`) : ''}</span>
                                </div>

                                <div className="flex gap-3">
                                    {
                                        fields.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(index, item.id)}
                                                className="bg-slate-200 p-2 rounded-2xl text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )
                                    }

                                    <button type="button" onClick={() => handleCollapsed(item.id)} className="transition-transform duration-300">
                                        <ChevronDown
                                            className={`transition-transform duration-300 ${collapsedIndexes.includes(item.id)
                                                ? '-rotate-90'
                                                : ''
                                                }`}
                                        />
                                    </button>
                                </div>

                            </div>

                            {/* Car Info & Specification */}
                            <div className="border border-slate-200 rounded-md p-5 mx-5 my-3">
                                <div className="flex justify-between">
                                    <h2 className="font-medium text-xl">Car Info And Specification</h2>
                                </div>
                                <AppFormInputRow
                                    label={`Car License Number`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            name={`car_infos.${index}.car_specification.license_number`}
                                            placeholder={'Enter car license number'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'car license number is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.license_number}
                                        />
                                    }
                                />

                                <AppFormInputRow
                                    label={`Car License Photo`}
                                    isMandatoryField={true}
                                    child={
                                        <AppImagePicker
                                            type='file'
                                            name={`car_infos.${index}.car_specification.license_photo`}
                                            placeholder={'Enter car license photo'}
                                            className={'min-h-[500px]'}
                                            register={register}
                                            rules={{
                                                required: 'car license photo is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.license_photo}
                                        />
                                    }
                                />

                                <AppFormInputRow
                                    label={`Car  Photo`}
                                    isMandatoryField={true}
                                    child={
                                        <AppImagePicker
                                            type='file'
                                            name={`car_infos.${index}.car_specification.car_photo`}
                                            placeholder={'Enter car  photo'}
                                            className={'min-h-[500px]'}
                                            register={register}
                                            rules={{
                                                required: 'car  photo is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.car_photo}
                                        />
                                    }
                                />

                                {/* car model */}
                                <AppFormInputRow
                                    label={`Car Model`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            name={`car_infos.${index}.car_specification.car_model`}
                                            placeholder={'Enter car model'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'car model is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.car_model}
                                        />
                                    }
                                />

                                {/* car capacity */}
                                <AppFormInputRow
                                    label={`Car Capacity`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            type={'number'}
                                            name={`car_infos.${index}.car_specification.capacity`}
                                            placeholder={'Enter car capacity'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'car capacity is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.capacity}
                                        />
                                    }
                                />

                                {/* amount per unit */}
                                <AppFormInputRow
                                    label={`Amount Per Unit`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            type={'number'}
                                            name={`car_infos.${index}.car_specification.amount_per_unit`}
                                            placeholder={'Enter charges amount per unit'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'charges amount is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.amount_per_unit}
                                        />
                                    }
                                />
                                {/*distance unit*/}
                                <AppFormInputRow
                                    label={`Distance Unit`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormDropDown
                                            name={`car_infos.${index}.car_specification.distance_unit`}
                                            placeholder={'Select distance unit'}
                                            register={register}
                                            className={'flex-2'}
                                            rules={{
                                                required: 'distance unit is required'
                                            }}
                                            /* FIXED: Added ?. after car_specification */
                                            error={errors.car_infos?.[index]?.car_specification?.distance_unit}
                                            options={distanceUnitOptions}
                                        />
                                    }
                                />
                            </div>

                            {/* Driver Info */}
                            <div className="border border-slate-200 rounded-md p-5 mx-5 my-3">
                                <div className="flex justify-between">
                                    <h2 className="font-medium text-xl">Driver Information</h2>
                                </div>
                                <AppFormInputRow
                                    label={`Driver Name`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            name={`car_infos.${index}.driver_info.name`}
                                            placeholder={'Enter driver name'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'driver name is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.name}
                                        />
                                    }
                                />

                                <AppFormInputRow
                                    label={`Driver DOB`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            type='date'
                                            name={`car_infos.${index}.driver_info.dob`}
                                            placeholder={'Enter driver date of birth'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'driver date of birth is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.dob}
                                        />
                                    }
                                />

                                {/* phone */}
                                <AppFormInputRow
                                    label={`Driver Phone`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            name={`car_infos.${index}.driver_info.phone`}
                                            placeholder={'Enter driver phone number'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'phone number is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.phone}
                                        />
                                    }
                                />

                                {/*gender*/}
                                <AppFormInputRow
                                    label={`Gender`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormDropDown
                                            name={`car_infos.${index}.driver_info.gender`}
                                            placeholder={'Select gender'}
                                            register={register}
                                            className={'flex-2'}
                                            rules={{
                                                required: 'gender is required'
                                            }}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.gender}
                                            options={genderOptions}
                                        />
                                    }
                                />

                                {/* nrc */}
                                <AppFormInputRow
                                    label={`Driver Nrc`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            type={'text'}
                                            name={`car_infos.${index}.driver_info.nrc`}
                                            placeholder={'Enter driver nrc'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'driver nrc is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.nrc}
                                        />
                                    }
                                />

                                {/* nrc photo */}
                                <AppFormInputRow
                                    label={`Driver Nrc Photo`}
                                    isMandatoryField={true}
                                    child={
                                        <AppImagePicker
                                            type={'file'}
                                            name={`car_infos.${index}.driver_info.nrcCardPhoto`}
                                            placeholder={'Enter driver nrc photo'}
                                            className={'min-h-[500px]'}
                                            register={register}
                                            rules={{
                                                required: 'nrc photo is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.nrcCardPhoto}
                                        />
                                    }
                                />

                                {/* driver license number */}
                                <AppFormInputRow
                                    label={`Driver License Number`}
                                    isMandatoryField={true}
                                    child={
                                        <AppFormInput
                                            type={'text'}
                                            name={`car_infos.${index}.driver_info.driverLicenseNumber`}
                                            placeholder={'Enter driver license number'}
                                            className={'flex-2'}
                                            register={register}
                                            rules={{
                                                required: 'driver license number is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.driverLicenseNumber}
                                        />
                                    }
                                />

                                {/* driver license photo */}
                                <AppFormInputRow
                                    label={`Driver License Photo`}
                                    isMandatoryField={true}
                                    child={
                                        <AppImagePicker
                                            type={'file'}
                                            name={`car_infos.${index}.driver_info.driverLicensePhoto`}
                                            placeholder={'Enter driver license photo'}
                                            className={'min-h-[500px]'}
                                            register={register}
                                            rules={{
                                                required: 'driver license photo is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.driverLicensePhoto}
                                        />
                                    }
                                />

                                {/* driver profile photo */}
                                <AppFormInputRow
                                    label={`Driver Profile Photo`}
                                    isMandatoryField={true}
                                    child={
                                        <AppImagePicker
                                            type={'file'}
                                            name={`car_infos.${index}.driver_info.driverProfilePhoto`}
                                            placeholder={'Enter driver profile photo'}
                                            className={'min-h-[450px]'}
                                            register={register}
                                            rules={{
                                                required: 'driver profile photo is required'
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            /* FIXED: Added ?. after driver_info */
                                            error={errors.car_infos?.[index]?.driver_info?.driverProfilePhoto}
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))
            }

            {/* add new car btn */}
            <div className="flex justify-end items-center mt-10">
                <button
                    type="button"
                    onClick={() => append({
                        car_specification: {
                            license_number: '',
                            car_model: '',
                            capacity: null,
                            amount_per_unit: null,
                            distance_unit: DistanceUnit.KILO_METER.value,
                            license_photo: null,
                            car_photo: null
                        },
                        driver_info: {
                            name: '',
                            dob: '',
                            gender: null,
                            phone: '',
                            nrc: '',
                            nrcCardPhoto: '',
                            driverLicenseNumber: '',
                            driverLicensePhoto: null,
                            driverProfilePhoto: null
                        }
                    })}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition"
                >
                    <Plus size={18} /> Add New Car
                </button>
            </div>
        </div>
    );
};

export default CarInfoStep;