import React from "react";

const AppStepper = ({ steps = [], currentStep = 0, onStepClick }) => {
    return (
        <div className="w-full flex items-center justify-between mb-10">
            {steps.map((step, index) => {
                const isDone = index < currentStep;
                const isActive = index === currentStep;

                return (
                    <React.Fragment key={index}>
                        {/* Step */}
                        <div className="flex flex-col items-center shrink-0">
                            <button
                                type="button"
                                onClick={() => onStepClick?.(index)}
                                className={`
                                    w-10 h-10 rounded-full border-2
                                    flex items-center justify-center
                                    transition-all
                                    ${
                                        isDone
                                            ? "bg-green-500 border-green-500 text-white"
                                            : isActive
                                            ? "bg-indigo-500 border-indigo-500 text-white"
                                            : "bg-white border-gray-300 text-gray-500"
                                    }
                                `}
                            >
                                {isDone ? "✓" : index + 1}
                            </button>

                            <span className="mt-2 text-sm whitespace-nowrap">
                                {step}
                            </span>
                        </div>

                        {/* Connector line */}
                        {index !== steps.length - 1 && (
                            <div className="flex-1 h-[2px] mx-4">
                                <div
                                    className={`h-full w-full transition-all ${
                                        index < currentStep
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default AppStepper;