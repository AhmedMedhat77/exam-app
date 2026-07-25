import { memo } from 'react';

interface RegistrationStepperProps {
  currentStep: number;
  steps: number;
}

export default memo(function FormStepper({
  currentStep,
  steps,
}: RegistrationStepperProps) {
  return (
    <div className="my-6 flex w-full items-center justify-center px-2">
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;
        const isLast = stepNumber === steps;

        return (
          <div
            key={stepNumber}
            className={`flex items-center ${isLast ? 'flex-none' : 'flex-1'}`}
          >
            {/* Step Node */}
            <div className="flex size-7 shrink-0 items-center justify-center">
              {isActive && (
                <div className="relative flex items-center justify-center">
                  {/* Soft pulsing active node */}
                  <div className="bg-primary/15 animate-pulse-shadow flex size-6 rotate-45 items-center justify-center transition-all duration-500">
                    <div className="bg-primary size-3 transition-all duration-300" />
                  </div>
                </div>
              )}

              {isCompleted && (
                <div className="bg-primary size-3 rotate-45 transition-all duration-300" />
              )}

              {isUpcoming && (
                <div className="border-primary bg-primary/10 size-3 rotate-45 border-[1.5px] transition-all duration-300" />
              )}
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className="flex flex-1 items-center">
                {stepNumber < currentStep ? (
                  <div className="bg-primary h-[1.5px] w-full transition-all duration-300" />
                ) : (
                  <div className="border-primary w-full border-t-[1.5px] border-dashed transition-all duration-300" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
