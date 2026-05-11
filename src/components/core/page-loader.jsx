import React, { Suspense } from "react";

const DefaultLoader = () => {
  return(
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center  text-xl">Loading...</div>
    </div>)

};

const PageLoader = (Component) => {
const WrappedComponent=(props)=>{
    return <Suspense fallback={<DefaultLoader/>}>
        <Component {...props} />
    </Suspense>
}

return WrappedComponent
};

export default PageLoader;
