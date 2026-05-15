import { Map, Plus, Trash2 } from "lucide-react";
import { AppFormInputRow } from "../../../../components/comp-form-input";
import { PointInfoInput } from "../../components/comp-point-info-input";

const WayPointInfoStep = ({
    register,
    watch,
    setValue,
    errors,
    fields,   // passed from useFieldArray
    append,   // passed from useFieldArray
    remove,   // passed from useFieldArray
    setOpenMap,
    setSelectedPointPrefix
}) => {
    return (
        <div className="space-y-6">
            {fields.map((item, index) => (
                <AppFormInputRow
                    key={item.id}
                    label={`Waypoint ${index + 1}`}
                    isMandatoryField={true}
                    child={
                        <div className="flex-2 flex gap-4 items-start">
                            <div className="grid grid-cols-3 gap-4 flex-1">
                                <PointInfoInput
                                    title={'name'}
                                    name={`waypoints.${index}.point_name`}
                                    placeholder={'Point name'}
                                    register={register}
                                    rules={{ required: 'Name required' }}
                                    error={errors.waypoints?.[index]?.point_name}
                                />
                                <PointInfoInput
                                    title={'latitude'}
                                    name={`waypoints.${index}.latitude`}
                                    placeholder={'Latitude'}
                                    register={register}
                                    rules={{ required: 'Required' }}
                                    error={errors.waypoints?.[index]?.latitude}
                                    child={
                                        <button type='button' onClick={() => {
                                            setOpenMap(true);
                                            setSelectedPointPrefix(`waypoints.${index}`);
                                        }}>
                                            <Map className="text-indigo-500" />
                                        </button>
                                    }
                                />
                                <PointInfoInput
                                    title={'longitude'}
                                    name={`waypoints.${index}.longitude`}
                                    placeholder={'Longitude'}
                                    register={register}
                                    rules={{ required: 'Required' }}
                                    error={errors.waypoints?.[index]?.longitude}
                                    child={
                                        <button type='button' onClick={() => {
                                            setOpenMap(true);
                                            setSelectedPointPrefix(`waypoints.${index}`);
                                        }}>
                                            <Map className="text-indigo-500" />
                                        </button>
                                    }
                                />
                            </div>
                            
                            {/* Remove Button - don't allow removing if only 1 row remains (optional) */}
                            {fields.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={() => remove(index)}
                                    className="mt-8 text-red-500 hover:text-red-700 flex items-center justify-center h-full"
                                >
                                    <Trash2 size={20} />
                                </button>
                            )}
                        </div>
                    }
                />
            ))}

            <div className="flex justify-end mt-10 items-center">
                {/* <h3 className="text-lg font-medium">Waypoints (Intermediate Stops)</h3> */}
                <button
                    type="button"
                    onClick={() => append({ name: '', latitude: '', longitude: '' })}
                    className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-100 transition"
                >
                    <Plus size={18} /> Add Waypoint
                </button>
            </div>
        </div>
    );
};

export default WayPointInfoStep;