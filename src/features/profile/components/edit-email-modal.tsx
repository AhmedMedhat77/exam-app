import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import FormStepper from '@/shared/ui/form-stepper';
import { useEffect, useState } from 'react';
import { EditEmailStep1 } from './edit-email-step-1';
import { EditEmailStep2 } from './edit-email-step-2';
import { Button } from '@/shared/ui/button';

interface EditEmailModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function EditEmailModal({
  open = true,
  onOpenChange,
}: EditEmailModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');

  // Reset modal step & email when closed or opened
  useEffect(() => {
    if (open) {
      setStep(1);
      setEmail('');
    }
  }, [open]);

  const handleNextStep = (enteredEmail: string) => {
    setEmail(enteredEmail);
    setStep(2);
  };

  const handleVerifyOtp = (code: string) => {
    // Handle OTP submission logic
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-h-77 min-w-144.75 p-6">
        {/* Stepper Header */}
        <DialogHeader>
          <FormStepper currentStep={step} steps={2} />
        </DialogHeader>

        {/* Modal Title */}
        <DialogTitle>
          {step == 1 && (
            <div className="space-y-4">
              <h2 className="font-title text-3xl font-bold text-gray-800">
                Change Email
              </h2>
              <h3 className="font-title text-primary text-lg font-bold">
                Enter your new email
              </h3>
            </div>
          )}
          {step == 2 && (
            <>
              <h2 className="font-title text-2xl text-gray-800">
                Verify Email
              </h2>
              <h3 className="font-title text-lg text-gray-600">
                Enter your new email
              </h3>
            </>
          )}
        </DialogTitle>

        {step === 1 ? (
          <EditEmailStep1 initialEmail={email} onNext={handleNextStep} />
        ) : (
          <EditEmailStep2
            email={email}
            onEditEmail={() => setStep(1)}
            onVerify={handleVerifyOtp}
          />
        )}
      </DialogContent>
      <DialogFooter>
        <Button
          type="submit"
          className="w-full justify-center text-sm font-medium"
        >
          Verify Code
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
