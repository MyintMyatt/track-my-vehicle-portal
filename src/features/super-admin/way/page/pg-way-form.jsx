import { set, useFieldArray, useForm } from "react-hook-form";
import { AppBackButton, AppPreviousButton, AppSubmitButton } from "../../../../components/comp-app-button";
import { AppLargeTitle } from "../../../../components/comp-app-titles";
import { AppFormDropDown, AppFormInput, AppFormInputCol, AppFormInputRow } from "../../../../components/comp-form-input";
import { Map } from "lucide-react";
import { useEffect, useState } from "react";
import LocationPickerModal from "../../components/comp-location-picker";
import { PointInfoInput } from "../../components/comp-point-info-input";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../global/reducer/global-modal-ui-slice";
import { DistanceUnit } from "../../../../constants/distance-unit";
import AppStepper from "../../../../components/comp-app-form-stepper";
import WayInfoStep from "../step/comp-way-info.step";
import { useLocationApi } from "../../../../hooks/map/use-location-api";
import useCalcuateDistance from "../../../../hooks/map/use-calculate-distance";
import WayPointInfoStep from "../step/comp-way-points-info-step";
import CarInfoStep from "../step/comp-car-info-setp";

const WayForm = ({ isEdit = false, data }) => {
    const {
        register,
        control,
        handleSubmit,
        trigger,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
            distance_unit: DistanceUnit.KILO_METER.value,
            waypoints: [{ name: '', lat: '', lng: '' }],
            car_infos: [{
                car_specification: {
                    car_id_card_number: '',
                    car_model: '',
                    capacity: null,
                    amount_per_unit: null,
                    distance_unit: DistanceUnit.KILO_METER.value,
                    car_id_card_number_photo: null,
                    car_photo: null
                }
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "waypoints"
    });

    const { 
        fields: carInfoFields,
        append: carInfoFieldsAppend,
        remove: carInfoFieldsRemove } = useFieldArray({
            control,
            name: 'car_infos'
        });

    const dispatch = useDispatch();
    const { isLoading, getLocationName, getDistanceBetweenPoints } = useLocationApi();
    const { isCalculating } = useCalcuateDistance(watch, setValue);

    const [openMap, setOpenMap] = useState(false);
    const [selectedPointPrefix, setSelectedPointPrefix] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const distanceUnitOptions = Object.values(DistanceUnit).map((unit) => (
        { value: unit.value, label: unit.label }
    ));

    const steps = [
        "Way Info",
        "All Point Info",
        "Cars Info",
        "Summary"
    ];

    const onSubmit = (data) => {
        console.log(data);
        console.log('click');

        dispatch(
            showErrorModal({
                title: "Server Error",
                message: "The server encountered an error. Please try again later."
            }))
    }


    const handleLocationConfirm = async (selectedPoint) => {

        if (!selectedPoint) return;
        const prefix = selectedPointPrefix;
        setValue(`${prefix}.latitude`, selectedPoint.lat.toString());
        setValue(`${prefix}.longitude`, selectedPoint.lng.toString());

        // get location name
        getLocationName(
            {
                lat: selectedPoint.lat,
                lng: selectedPoint.lng
            },
            {
                onSuccess: (data) => {
                    setValue(`${prefix}.point_name`, data?.payload.display_name);
                    setOpenMap(false);
                    setSelectedPointPrefix(null);
                },
                onError: (error) => {
                    setOpenMap(false);
                }
            }
        );

    }

    const handleNext = async () => {
        let fieldsToValidate = [];
        console.log(currentStep);

        switch (currentStep) {
            case 0:
                fieldsToValidate = [
                    'title',
                    'description',
                    'start_point_name',
                    'start_latitude',
                    'start_longitude',
                    'end_point_name',
                    'end_latitude',
                    'end_longitude',
                    'total_distance_value',
                    'distance_unit'
                ];
                break;
            case 1:
                fieldsToValidate = ['waypoints'];
                break;
            case 2:
                fieldsToValidate = ['car_infos'];
                break;
            
            

        };

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep((prev) => prev + 1);
        }
    }

    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    }

    return (
        <div className="overflow-scroll">
            <AppBackButton />
            <AppLargeTitle text={!isEdit ? 'Create New Car Way' : 'Edit Car Way'} className={'mb-10'} />


            <form className="ml-10 flex flex-col">

                <AppStepper
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={(index) => {
                        setCurrentStep(index);
                    }}
                />

                {currentStep === 0 && (
                    <WayInfoStep
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                        distanceUnitOptions={distanceUnitOptions}
                        setOpenMap={setOpenMap}
                        setSelectedPointPrefix={setSelectedPointPrefix}
                    />
                )}

                {currentStep === 1 && (
                    <WayPointInfoStep
                        register={register}
                        watch={watch}
                        seValue={setValue}
                        errors={errors}
                        fields={fields}
                        append={append}
                        remove={remove}
                        setOpenMap={setOpenMap}
                        setSelectedPointPrefix={setSelectedPointPrefix}
                    />
                )}


                {currentStep === 2 && (
                    <CarInfoStep
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        errors={errors}
                        fields={carInfoFields}
                        append={carInfoFieldsAppend}
                        remove={carInfoFieldsRemove}
                    />
                )}

                <div className="mt-12 flex gap-3 justify-end">
                    {currentStep > 0 && (
                        <AppPreviousButton
                            type={'button'}
                            name={'Previous'}
                            className={'w-44 bg-slate-200 text-black'}
                            onClick={handlePrevious}
                        />
                    )}
                    {currentStep < steps.length - 1 ? (
                        <AppSubmitButton
                            name={'Next'}
                            type={'button'}
                            className={'w-44 text-white'}
                            onClick={handleNext}
                        />
                    ) : (
                        <AppSubmitButton
                            name={'Submit'}
                            className={'w-44 text-white'}
                            onClick={handleSubmit(onSubmit)}
                        />
                    )}
                </div>
            </form>

            {/* location picker */}
            <LocationPickerModal
                open={openMap}
                onClose={() => setOpenMap(false)}
                onConfirm={handleLocationConfirm}
                loading={isLoading}
            />
        </div>
    );

};

export default WayForm;