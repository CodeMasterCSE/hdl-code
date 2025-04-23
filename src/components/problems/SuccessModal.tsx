import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Trophy, ChevronRight, Sparkles, Award } from 'lucide-react';

interface SuccessModalProps {
  onClose: () => void;
  problem: any;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, problem }) => {
  const navigate = useNavigate();

  const goToProblems = () => {
    navigate('/problems');
    onClose();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Success</DialogTitle>
        <DialogDescription className="sr-only">
          You've successfully solved the {problem.title} problem!
        </DialogDescription>
        
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            <Sparkles className="h-6 w-6 text-yellow-500 absolute -bottom-2 -left-2 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Excellent Work!</h2>
          <p className="text-xl mb-6">
            You've successfully solved the <span className="font-medium">{problem.title}</span> problem!
          </p>
          
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">
              {problem.difficulty === 'Beginner' ? '10' : 
               problem.difficulty === 'Intermediate' ? '20' : '30'} points earned
            </span>
            <Award className="h-5 w-5 text-blue-500 ml-2" />
          </div>
          
          <div className="flex gap-4 w-full">
            <Button 
              onClick={goToProblems} 
              className="flex-1"
              variant="outline"
            >
              More Problems
            </Button>
            <Button 
              onClick={goToDashboard} 
              className="flex-1 gap-2"
            >
              View Dashboard
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
