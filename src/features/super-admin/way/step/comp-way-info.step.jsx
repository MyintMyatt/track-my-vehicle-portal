import { Map } from "lucide-react";
import { AppFormDropDown, AppFormInput, AppFormInputCol, AppFormInputRow } from "../../../../components/comp-form-input";
import { PointInfoInput } from "../../components/comp-point-info-input";

const WayInfoStep = ({
    register,
    watch,
    setValue,
    errors,
    distanceUnitOptions,
    setOpenMap,
    setSelectedPointPrefix
}) => {
    return(
        <>
            <AppFormInputRow
                    label={'Title'}
                    isMandatoryField={true}
                    child={
                        <AppFormInput
                            name={'title'}
                            placeholder={'Enter title'}
                            className={'flex-2'}
                            register={register}
                            rules={{
                                required: 'title is required'
                            }}
                            watch={watch}
                            setValue={setValue}
                            error={errors.title}
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
                                name={'start.point_name'}
                                placeholder={'Enter start point name'}

                                register={register}
                                rules={{
                                    required: 'start point name is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start?.point_name}
                            />
                            <PointInfoInput
                                title={'latitude'}
                                name={'start.latitude'}
                                placeholder={'Enter start point latitude'}
                                register={register}
                                rules={{
                                    required: 'start point latitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start?.latitude}
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
                                name={'start.longitude'}
                                placeholder={'Enter start point longitude'}
                                register={register}
                                rules={{
                                    required: 'start point longitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.start?.longitude}
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
                    label={'End Point'}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 grid grid-cols-3 justify-start gap-4 ">
                            <PointInfoInput
                                title={'name'}
                                name={'end.point_name'}
                                placeholder={'Enter end point name'}

                                register={register}
                                rules={{
                                    required: 'end point name is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end?.point_name}
                            />
                            <PointInfoInput
                                title={'latitude'}
                                name={'end.latitude'}
                                placeholder={'Enter end point latitude'}
                                register={register}
                                rules={{
                                    required: 'end point latitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end?.latitude}
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
                                name={'end.longitude'}
                                placeholder={'Enter end point longitude'}
                                register={register}
                                rules={{
                                    required: 'end point longitude is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.end?.longitude}
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

                {/* Total Distance */}
                <AppFormInputRow
                    label={'Total Distance'}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 grid grid-cols-2 gap-4">
                            <PointInfoInput
                                title={'distance length'}
                                type={'number'}
                                name={'total_distance_value'}
                                placeholder={'Enter start point name'}

                                register={register}
                                rules={{
                                    required: 'total distance value is required'
                                }}
                                watch={watch}
                                setValue={setValue}
                                error={errors.total_distance_value}
                            />
                            <AppFormInputCol
                                title={'unit'}
                                child={
                                    <AppFormDropDown
                                        name={'distance_unit'}
                                        placeholder={'Select distance unit'}

                                        register={register}
                                        rules={{
                                            required: 'tdistance unit is required'
                                        }}

                                        error={errors.distance_unit}
                                        options={distanceUnitOptions}
                                    />
                                }
                            />

                        </div>
                    }
                />

        </>
    );
};

export default WayInfoStep;