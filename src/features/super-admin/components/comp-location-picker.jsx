import { useState } from "react";
import MapBaseLayout from "../../../layout/lyt-map-layout";
import LocationMaker from "../../map/components/comp-location-maker";

const LocationPickerModal = (
    {   open,
        onClose,
        onConfirm }
) => {
    const [selectedPoint, setSelectedPoint] = useState(null);
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl w-[1000px]">
                <MapBaseLayout
                    parentStyle="h-[700px]"
                    children={<LocationMaker
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                    />}
                />
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-slate-200 text-sm p-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => onConfirm(selectedPoint)}
                        className="bg-indigo-500 text-sm text-white p-2 px-4 rounded-md"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationPickerModal;