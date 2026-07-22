interface IQuestionStepCounterProps {
  currentStep?: number;
  totalSteps?: number;
}

export default function QuestionStepCounter({
  currentStep = 0,
  totalSteps = 0,
}: IQuestionStepCounterProps) {
  return (
    <p className="text-xs font-light text-gray-500">
      Question <span className="text-primary font-bold">{currentStep}</span> of{' '}
      <span>{totalSteps}</span>
    </p>
  );
}
