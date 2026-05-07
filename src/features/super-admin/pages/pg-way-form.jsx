import { set, useForm } from "react-hook-form";
import { AppBackButton } from "../../../components/comp-app-button";
import { AppLargeTitle } from "../../../components/comp-app-titles";
import { AppFormInput, AppFormInputCol, AppFormInputRow } from "../../../components/comp-form-input";
import { Map } from "lucide-react";
import { useState } from "react";
import LocationPickerModal from "../components/comp-location-picker";
import { PointInfoInput } from "../components/comp-point-info-input";

const WayForm = ({ isEdit = false, data }) => {

    const [openMap, setOpenMap] = useState(false);
    const [selectedPointPrefix, setSelectedPointPrefix] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        console.log('hello');

    }

    const handleLocationConfirm = async (selectedPoint) => {
        if (!selectedPoint) return;

        setLoading(true);

        const prefix = selectedPointPrefix;
        setValue(`${prefix}_latitude`, selectedPoint.lat.toString());
        setValue(`${prefix}_longitude`, selectedPoint.lng.toString());

        // get location name
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedPoint.lat}&lon=${selectedPoint.lng}`
        );

        const data = await res.json();
        setValue(`${prefix}_point_name`, data.display_name);

        setLoading(false);
        setOpenMap(false);
        setSelectedPointPrefix(null);
    }

    return (
        <div>
            <AppBackButton />
            <AppLargeTitle text={!isEdit ? 'Create New Car Way' : 'Edit Car Way'} className={'mb-10'} />

            <form className="ml-10" onSubmit={handleSubmit(onSubmit)}>
                <AppFormInputRow
                    label={'Title'}
                    isMandatoryField={true}
                    child={
                        <AppFormInput
                            name={'title'}
                            value={'Hledan to Dala'}
                            placeholder={'Enter title'}
                            className={'flex-2'}
                            register={register}
                            disabled={true}
                            rules={{
                                required: 'title is required'
                            }}
                            watch={watch}
                            setValue={setValue}
                            error={errors.titile}
                        />
                    }
                />

                <AppFormInputRow
                    label={'Description'}
                    isMandatoryField={true}
                    child={
                        <AppFormInput
                            isTextArea={true}
                            name={'description'}
                            placeholder={'Enter description'}
                            className={'flex-2'}
                            register={register}
                            rules={{
                                required: 'description is required'
                            }}
                            watch={watch}
                            setValue={setValue}
                            error={errors.description}
                        />
                    }
                />

                {/* Start Point Info */}
                <AppFormInputRow
                    label={'Start Point'}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 grid grid-cols-3 justify-start gap-4 ">
                            <PointInfoInput
                                title={'name'}
                                name={'start_point_name'}
                                placeholder={'Enter start point name'}

                                register={register}
                                rules={{
                                    required: 'start point name is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start_point_name}
                            />
                            <PointInfoInput
                                title={'latitude'}
                                name={'start_latitude'}
                                placeholder={'Enter start point latitude'}
                                register={register}
                                rules={{
                                    required: 'start point latitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start_latitude}
                                child={
                                    <button type='button' onClick={() => {
                                        setOpenMap(true);
                                        setSelectedPointPrefix("start");
                                    }}>
                                        <Map className="text-indigo-500 hover:text-indigo-700" />
                                    </button>
                                }
                            />
                            <PointInfoInput
                                title={'longitude'}
                                name={'start_longitude'}
                                placeholder={'Enter start point longitude'}
                                register={register}
                                rules={{
                                    required: 'start point longitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start_longitude}
                                child={
                                    <button type='button' onClick={() => {
                                        setOpenMap(true);
                                        setSelectedPointPrefix("start");
                                    }}>
                                        <Map className="text-indigo-500 hover:text-indigo-700" />
                                    </button>
                                }
                            />
                        </div>
                    }
                />

                {/* End Point Info */}
                <AppFormInputRow
                    label={'Ent Point'}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 grid grid-cols-3 justify-start gap-4 ">
                            <PointInfoInput
                                title={'name'}
                                name={'end_point_name'}
                                placeholder={'Enter end point name'}

                                register={register}
                                rules={{
                                    required: 'end point name is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end_point_name}
                            />
                            <PointInfoInput
                                title={'latitude'}
                                name={'end_latitude'}
                                placeholder={'Enter end point latitude'}
                                register={register}
                                rules={{
                                    required: 'end point latitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end_latitude}
                                child={
                                    <button type='button' onClick={() => {
                                        setOpenMap(true);
                                        setSelectedPointPrefix("end");
                                    }}>
                                        <Map className="text-indigo-500 hover:text-indigo-700" />
                                    </button>
                                }
                            />
                            <PointInfoInput
                                title={'longitude'}
                                name={'end_longitude'}
                                placeholder={'Enter end point longitude'}
                                register={register}
                                rules={{
                                    required: 'end point longitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end_longitude}
                                child={
                                    <button type='button' onClick={() => {
                                        setOpenMap(true);
                                        setSelectedPointPrefix("end");
                                    }}>
                                        <Map className="text-indigo-500 hover:text-indigo-700" />
                                    </button>
                                }
                            />
                        </div>
                    }
                />

                <button type="submit">Submit</button>
            </form>
            <LocationPickerModal
                open={openMap}
                onClose={() => setOpenMap(false)}
                onConfirm={handleLocationConfirm}
                loading={loading}
            />
        </div>
    );

};

export default WayForm;