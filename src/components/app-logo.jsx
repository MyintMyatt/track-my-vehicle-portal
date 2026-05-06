import logo from '@/assets/app-logo.png';

const AppLogo = ({width = 300, className}) => {
    return (
        <div className={`flex items-center ${className}`}>
            <img  width={width} style = {{height : 'auto'}}src={logo} alt='AppLogo' />
        </div>
    );
};

export default AppLogo;