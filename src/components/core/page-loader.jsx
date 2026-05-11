import React, { Suspense } from "react";
import { FourSquare } from "react-loading-indicators";

const DefaultLoader = () => {
  return(
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="text-center  text-xl">
          <FourSquare color="#0b26f9" size="medium" text="" textColor="" />
      </div>
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
