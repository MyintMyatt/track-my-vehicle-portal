import { set, useForm } from "react-hook-form";
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

const WayForm = ({ isEdit = false, data }) => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        defaultValues: {
        distance_unit: DistanceUnit.KILO_METER.value,
    }
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
        setValue(`${prefix}_latitude`, selectedPoint.lat.toString());
        setValue(`${prefix}_longitude`, selectedPoint.lng.toString());

        // get location name
        getLocationName(
            {
                lat: selectedPoint.lat,
                lng: selectedPoint.lng
            },
            {
                onSuccess: (data) => {
                    setValue(`${prefix}_point_name`, data?.payload.display_name);
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
        let fields = [];

        if (currentStep === 0) {
            fields = [
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
        }

        const isValid = await trigger(fields);
        if (isValid) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
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
                    <div>
                        All Point Info
                    </div>
                )}

                <div className="mt-12 flex gap-3 justify-end">
                    {currentStep > 0 && (
                        <AppPreviousButton
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