import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isOpen: false,
    isError: false,
    title: '',
    message: '',
    btnText: 'OK'
};

const modalUiSlice = createSlice({
    name: 'ui',
    initialState: initState,
    reducers: {
        showErrorModal: (state, action) => {
            state.isOpen = true,
                state.isError = true,
                state.title = action.payload.title;
            state.message = action.payload.message;
            state.btnText = action.payload.btnText || 'OK';
        },
        showSuccessModal: (state, action) => {
            state.isOpen = true,
                state.isError = false,
                state.title = action.payload.title;
            state.message = action.payload.message;
            state.btnText = action.payload.btnText || 'OK';
        },
        hideModal: (state) => {
            state.isOpen = false;
        },
    }
});

export const { showErrorModal, showSuccessModal, hideModal } = modalUiSlice.actions;
export default modalUiSlice.reducer;