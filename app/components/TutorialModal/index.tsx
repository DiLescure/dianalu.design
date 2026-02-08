import React, { type ReactNode, useEffect, useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

export interface TutorialStep {
  title: string;
  content: ReactNode;
  media?: ReactNode;
}

export interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: TutorialStep[];
  className?: string;
  mediaContainerClassName?: string;
  finishLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  skipLabel?: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  steps,
  className,
  mediaContainerClassName,
  finishLabel = 'Finish',
  nextLabel = 'Next',
  backLabel = 'Back',
  skipLabel = 'Skip',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Reset to first step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
    }
  }, [isOpen]);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!currentStep) {
    return null;
  }

  const actionButtons = (
    <div className="flex justify-between w-full">
      <Button onPress={handleSkip} className="btn-ghost">
        {skipLabel}
      </Button>
      <div className="flex gap-2">
        <Button onPress={handleBack} isDisabled={isFirstStep} className="btn-outline">
          {backLabel}
        </Button>
        <Button onPress={handleNext} className="btn-primary">
          {isLastStep ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentStep.title}
      className={className}
      boxClassName={currentStep.media ? 'w-11/12 max-w-5xl' : undefined}
      actionChildren={actionButtons}
      closeButtonLabel={undefined} // We handle closing via Skip/Finish or the X button
    >
      <div className="py-4">
        {currentStep.media ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col justify-center w-full md:w-[40%]">
              {currentStep.content}
            </div>
            <div
              className={`flex items-center justify-center overflow-hidden rounded-lg bg-base-200/50 w-full md:w-[60%] ${
                mediaContainerClassName || ''
              }`}
            >
              {currentStep.media}
            </div>
          </div>
        ) : (
          currentStep.content
        )}
        <div className="mt-4 flex justify-center gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStepIndex ? 'bg-primary' : 'bg-base-300'
              }`}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TutorialModal;
