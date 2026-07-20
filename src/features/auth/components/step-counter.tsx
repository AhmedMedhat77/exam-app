import type { IStepCounterProps } from '../types/step-counter';

export default function StepCounter({ currentStep, steps }: IStepCounterProps) {
  return (
    <div className="flex items-center justify-center w-full my-6 px-2">
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
            <div className="size-7 flex items-center justify-center shrink-0">
              {isActive && (
                <div className="size-6 bg-primary/20 rotate-45 flex items-center justify-center transition-all duration-300">
                  <div className="size-3 bg-primary transition-all duration-300" />
                </div>
              )}

              {isCompleted && (
                <div className="size-3 bg-primary rotate-45 transition-all duration-300" />
              )}

              {isUpcoming && (
                <div className="size-3 border-[1.5px] border-primary bg-background rotate-45 transition-all duration-300" />
              )}
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className="flex-1 mx-2 flex items-center">
                {stepNumber < currentStep ? (
                  <div className="w-full h-[1.5px] bg-primary transition-all duration-300" />
                ) : (
                  <div className="w-full border-t-[1.5px] border-dashed border-primary transition-all duration-300" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
