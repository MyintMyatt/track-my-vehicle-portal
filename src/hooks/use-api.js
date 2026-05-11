import { useCallback, useState } from "react"
import { useDispatch } from "react-redux";
import { showErrorModal } from "../global/reducer/global-modal-ui-slice";

export const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const request = useCallback(async (apiFunc, options = {}) => {
        const {
            onSuccess,
            onError,
            showLoader = true,
            errorTitle = 'Alert'
        } = options;

        try {
            
            if (showLoader) setIsLoading(true);
            const response = await apiFunc();
            if (onSuccess) onSuccess(response.data);
            return response.data;
        } catch (error) {

            const status = error.response?.status;
            const message = error.response?.data.messages?.[0] || 'An unexpected error occur';

            dispatch(showErrorModal({
                title: errorTitle,
                message: message
            }))

            if (onError) onError(error);
            throw error;
        } finally {
            if (showLoader) setIsLoading(false);
        }
    }, [dispatch]);

    return { request, isLoading };
}