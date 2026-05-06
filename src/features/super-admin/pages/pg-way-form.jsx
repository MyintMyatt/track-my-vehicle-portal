import { AppBackButton } from "../../../components/comp-app-button";
import { AppLargeTitle } from "../../../components/comp-app-titles";
import { AppFormInput, AppFormInputRow } from "../../../components/comp-form-input";

const WayForm = ({isEdit = false, data}) => {
    return(
        <div>
           <AppBackButton />
           <AppLargeTitle text={!isEdit ? 'Create New Car Way' : 'Edit Car Way'} className={'mb-10'}/>
           
           <div className="ml-10">
                <AppFormInputRow 
                    label={'Title'}
                    isMandatoryField={true}
                    placeholder={'Enter title'}
                    className={'flex-2'}
                />

                <AppFormInputRow 
                    label={'Description'}
                    isMandatoryField={true}
                    placeholder={'Enter description'}
                    className={'flex-2'}
                />
           </div>
        </div>
    );

};

export default WayForm;