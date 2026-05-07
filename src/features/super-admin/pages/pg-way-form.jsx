import { useForm } from "react-hook-form";
import { AppBackButton } from "../../../components/comp-app-button";
import { AppLargeTitle } from "../../../components/comp-app-titles";
import { AppFormInput, AppFormInputRow } from "../../../components/comp-form-input";
import { Map } from "lucide-react";
import { useState } from "react";
import LocationPickerModal from "../components/comp-location-picker";

const WayForm = ({ isEdit = false, data }) => {

    const [openMap, setOpenMap] = useState(false);

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

                <AppFormInputRow
                    label={'Start Point'}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 grid grid-cols-3 justify-start gap-4 ">
                            <div className="flex flex-col gap-2 min-w-0">
                                <span>name</span>
                                <AppFormInput

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
                            </div>
                            <div className="flex flex-col gap-2 min-w-0">
                                <span>latitude</span>
                                <AppFormInput

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
                                        <button type='button' onClick={() => setOpenMap(true)}>
                                            <Map className="text-indigo-500 hover:text-indigo-700" />
                                        </button>
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2 min-w-0">
                                <span>longitude</span>
                                <AppFormInput

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
                                        <button>
                                            <Map className="text-indigo-500 hover:text-indigo-700" />
                                        </button>
                                    }
                                />
                            </div>
                        </div>
                    }
                />

                <button type="submit">Submit</button>
            </form>
            <LocationPickerModal
                open={openMap}
                onClose={() => setOpenMap(false)}
                // onConfirm={handleLocationConfirm}
            />
        </div>
    );

};

export default WayForm;