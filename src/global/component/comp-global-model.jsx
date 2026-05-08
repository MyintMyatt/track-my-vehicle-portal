import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../reducer/global-modal-ui-slice";

const GlobalModel = () => {
    const dispatch = useDispatch();

    const { isOpen, isError, title, message, btnText } = useSelector((state) => state.global_modal_ui);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="min-w-[300px] h-70 flex flex-col justify-center items-center gap-2 rounded-lg p-20 bg-white text-center shadow-lg">
                <h2 className="mb-2 text-xl font-semibold">
                    {title}
                </h2>

                <p className="mb-4 text-gray-600">
                    {message}
                </p>

                <button 
                onClick={() => dispatch(hideModal())}
                className="rounded-md bg-indigo-700 mt-5 text-white py-2 px-15">
                    {btnText}
                </button>
            </div>3
        </div>
    )
}


export default GlobalModel;