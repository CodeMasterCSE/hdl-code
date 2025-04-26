import { cn } from "@/lib/utils";

interface SemiCircularProgressProps {
  easy: number;
  medium: number;
  hard: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  className?: string;
}

export const SemiCircularProgress = ({
  easy,
  medium,
  hard,
  totalEasy,
  totalMedium,
  totalHard,
  className
}: SemiCircularProgressProps) => {
  // Calculate percentages
  const easyPercentage = (easy / totalEasy) * 100;
  const mediumPercentage = (medium / totalMedium) * 100;
  const hardPercentage = (hard / totalHard) * 100;

  // SVG path calculations
  const radius = 120;
  const centerX = 150;
  const centerY = 150;
  const startAngle = -180; // Start from left
  const endAngle = 0; // End at right

  // Convert percentage to angle
  const getAngle = (percentage: number) => {
    return startAngle + (percentage / 100) * (endAngle - startAngle);
  };

  // Convert angle to coordinates
  const getCoordinates = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  // Create arc path
  const createArc = (startAngle: number, endAngle: number) => {
    const start = getCoordinates(startAngle);
    const end = getCoordinates(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className={cn("relative w-[300px] h-[150px]", className)}>
      <svg width="300" height="150" viewBox="0 0 300 150">
        {/* Background arc */}
        <path
          d={createArc(startAngle, endAngle)}
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          className="text-muted"
        />
        
        {/* Easy progress (green) */}
        <path
          d={createArc(startAngle, getAngle(easyPercentage))}
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          className="text-green-500"
        />
        
        {/* Medium progress (yellow) */}
        <path
          d={createArc(getAngle(easyPercentage), getAngle(easyPercentage + mediumPercentage))}
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          className="text-yellow-500"
        />
        
        {/* Hard progress (red) */}
        <path
          d={createArc(
            getAngle(easyPercentage + mediumPercentage),
            getAngle(easyPercentage + mediumPercentage + hardPercentage)
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="20"
          className="text-red-500"
        />
      </svg>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Easy</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>Hard</span>
        </div>
      </div>

      {/* Progress text in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold">
          {easy + medium + hard}/{totalEasy + totalMedium + totalHard}
        </div>
        <div className="text-sm text-muted-foreground">Problems Solved</div>
      </div>
    </div>
  );
}; 