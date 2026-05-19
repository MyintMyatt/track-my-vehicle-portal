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
import { Gender } from "../../../../constants/app-common-const";
import { useWayApi } from "../hook/use-way-api";

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
    const { isLoading: submitLoading, saveWay } = useWayApi();
    const { isCalculating } = useCalcuateDistance(watch, setValue);

    const [openMap, setOpenMap] = useState(false);
    const [selectedPointPrefix, setSelectedPointPrefix] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const distanceUnitOptions = Object.values(DistanceUnit).map((unit) => (
        { value: unit.value, label: unit.label }
    ));
    const genderOptions = Object.values(Gender).map((gender) => (
        { value: gender, label: gender }
    ));

    const steps = [
        "Way Info",
        "All Point Info",
        "Cars Info",
        "Summary"
    ];

    const onSubmit = async (formData) => {
        try {
            console.log(formData);

            const body = new FormData();

            body.append('title', formData.title || '');
            body.append('description', formData.description || '');
            body.append('totalDistance', formData.total_distance_value || ''); // Maps your state to backend field
            body.append('totalDistanceUnit', formData.distance_unit || '');     // Maps your state to backend field

            // 2. Start Point (Mapping your 'start' to backend 'startPoint')
            body.append('startPoint.name', formData.start?.point_name || '');
            body.append('startPoint.lat', formData.start?.latitude || '');
            body.append('startPoint.lng', formData.start?.longitude || '');

            // 3. End Point (Mapping your 'end' to backend 'endPoint')
            body.append('endPoint.name', formData.end?.point_name || '');
            body.append('endPoint.lat', formData.end?.latitude || '');
            body.append('endPoint.lng', formData.end?.longitude || '');

            // 4. Waypoints Array (Transforming dot notation to backend bracket notation)

            formData.waypoints.forEach((wp, index) => {

                body.append(`wayPoints[${index}].name`, wp?.point_name || '');
                body.append(`wayPoints[${index}].lat`, wp?.latitude || '');
                body.append(`wayPoints[${index}].lng`, wp?.longitude || '');
            });


            // 5. New Car Request Array

            formData.car_infos?.forEach((car, index) => {
                const spec = car.car_specification || {};
                const driver = car.driver_info || {};

                body.append(`newCarRequest[${index}].carInfoAndSpecification.carLicenseNumber`, spec.license_number || '');
                body.append(`newCarRequest[${index}].carInfoAndSpecification.carModel`, spec.car_model || '');
                body.append(`newCarRequest[${index}].carInfoAndSpecification.capacity`, spec.capacity || '');
                body.append(`newCarRequest[${index}].carInfoAndSpecification.amountPerUnit`, spec.amount_per_unit || '');
                body.append(`newCarRequest[${index}].carInfoAndSpecification.unit`, spec.distance_unit || '');

                if (car.car_specification?.license_photo?.[index]) {
                    body.append(`newCarRequest[${index}].carInfoAndSpecification.carLicenseNumberPhoto`, spec.license_photo[0]);
                }
                if (car.car_specification?.car_photo?.[index]) {
                    body.append(`newCarRequest[${index}].carInfoAndSpecification.carPhoto`, spec.car_photo[0]);
                }

                body.append(`newCarRequest[${index}].driverInfo.name`, driver.name || '');
                body.append(`newCarRequest[${index}].driverInfo.dob`, driver.dob || '');
                body.append(`newCarRequest[${index}].driverInfo.gender`, driver.gender || '');
                body.append(`newCarRequest[${index}].driverInfo.phone`, driver.phone || '');
                body.append(`newCarRequest[${index}].driverInfo.nrc`, driver.nrc || '');
                body.append(`newCarRequest[${index}].driverInfo.driverLicenseNumber`, driver.driverLicenseNumber || '');

                // D. Driver Info Images (Extract from FileList array)
                if (car.driver_info?.nrcCardPhoto?.[index]) {
                    body.append(`newCarRequest[${index}].driverInfo.nrcCardPhoto`, driver.nrcCardPhoto[0]);
                }
                if (car.driver_info?.driverLicensePhoto?.[index]) {
                    body.append(`newCarRequest[${index}].driverInfo.driverLicensePhoto`, driver.driverLicensePhoto[0]);
                }
                if (car.driver_info?.driverProfilePhoto?.[index]) {
                    body.append(`newCarRequest[${index}].driverInfo.driverProfilePhoto`, driver.driverProfilePhoto[0]);
                }
            });


            // // Debug point: See how your FormData payload looks before sending
            // for (let pair of body.entries()) {
            //     console.log(pair[0] + ': ', pair[1]);
            // }

            await saveWay(body, {
                onSuccess: (data) => {
                    console.log("Way created successfully!", data);
                    dispatch(showErrorModal({
                        title: "Way created Successfully",
                        message: data?.payload?.message
                    }))
                },
                onError: (error) => {
                    // Optional: Component-specific error tracking (useApi already pops up the modal)
                    console.error("Submission failed at component level:", error);
                }
            });

            console.log("Uploaded successfully!");

        } catch (error) {
            console.error("Submission failed", error);
            dispatch(showErrorModal({ message: "Something went wrong sending form data." }));
        }
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
                    'start.point_name',
                    'start.latitude',
                    'start.longitude',
                    'end.point_name',
                    'end.latitude',
                    'end.longitude',
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


            <form className="ml-10 flex flex-col" onSubmit={(e) => e.preventDefault()}>

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
                        setValue={setValue}
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
                        distanceUnitOptions={distanceUnitOptions}
                        genderOptions={genderOptions}
                    />
                )}

                {currentStep === 3 && (
                    <div>summary</div>
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
                            loading={submitLoading}
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