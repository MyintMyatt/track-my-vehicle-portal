import { useState } from "react";
import MapBaseLayout from "../../../layout/lyt-map-layout";
import LocationMaker from "../../map/components/comp-location-maker";

const LocationPickerModal = (
    { open,
        onClose,
        onConfirm,
        loading = false
    }
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
                        {!loading ? 'Confirm' : <div className="flex justify-center items-center gap-2">
                            <div className="border-white border-2 border-t-transparent animate-spin w-4 h-4 rounded-full">
                            </div>
                            Processing....
                        </div>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationPickerModal;