
export const AppLargeTitle = ({text, className}) =>{
    return(
        <h1 className={`text-2xl font-medium ${className}`}>{text}</h1>
    );
};

export const AppMeduimTitle = ({text, className}) => {
    return(<h1 className={`text-xl font-medium ${className}`}>{text}</h1>);
}