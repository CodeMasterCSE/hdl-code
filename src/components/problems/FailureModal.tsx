
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from 'lucide-react';

interface FailureModalProps {
  onClose: () => void;
  passedTests: number;
  totalTests: number;
}

const FailureModal: React.FC<FailureModalProps> = ({ onClose, passedTests, totalTests }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Not quite there yet!</h2>
          <p className="text-xl mb-6">
            You passed {passedTests} out of {totalTests} tests.
          </p>
          
          <p className="mb-6 text-muted-foreground">
            Take a look at the failing tests and try again. You're getting closer!
          </p>
          
          <Button 
            onClick={onClose} 
            className="w-full gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FailureModal;
