import AppLogo from "../../../components/app-logo";
import AppSubmitButton from "../../../components/comp-app-button";
import AppTextInput from "../../../components/comp-app-input";

const LoginForm = () => {

    return (
       <div className="flex flex-col items-center justify-center p-10 border-gray-300 gap-4 mb-7">
           <AppLogo width={200} />
           <form className="flex flex-col items-center gap-3">
            
            <AppTextInput
                type="email"
                placeholder="enter email"
            />

            <AppTextInput
                type="password"
                placeholder="enter password"
            />

            <AppSubmitButton 
                name="Login"
                className='mt-3'
            />
           </form>
       </div>
    );
};

export default LoginForm;