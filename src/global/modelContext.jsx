import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
    const [modelConfig, setModelConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        btnText: 'OK',
    });

    const openErrorModel = (title, message, btnText = 'OK') => {
        setModelConfig({
            isOpen: true,
            title: title,
            message: message,
            btnText: btnText
        })
    };

    const closeModel = () => {
        setModelConfig((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModelContext.Provider value={{ openErrorModel, closeModel }}>
            {children}

            {modelConfig.isOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2>{modelConfig.title}</h2>
                        <p>{modalConfig.message}</p>
                        <button onClick={closeModal}>{modalConfig.btnText}</button>
                    </div>
                </div>
            )}
        </ModelContext.Provider>
    );
};

export const useModel = () => {
    const context = useContext(ModelContext);
    if(!context){
        throw new Error('useModel must be used withing  ModelProvider')
    }
    return context;
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', minWidth: '300px' }
};