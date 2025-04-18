
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Code, HelpCircle } from 'lucide-react';

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
          
          <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
          <p className="text-xl mb-6">
            You passed {passedTests} out of {totalTests} tests.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex items-start">
              <HelpCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-left text-sm text-amber-800">
                <p className="font-medium mb-1">Troubleshooting Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Check the logical correctness of your implementation</li>
                  <li>Whitespace and formatting issues are ignored during testing</li>
                  <li>Focus on the expected outputs in the test cases</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 w-full">
            <Button 
              onClick={onClose} 
              className="w-full gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FailureModal;
