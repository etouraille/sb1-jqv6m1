import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface PriceRangeSelectorProps {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
  initialRange?: [number, number];
}

export default function PriceRangeSelector({ min, max, onChange, initialRange }: PriceRangeSelectorProps) {
  const [range, setRange] = useState<[number, number]>(initialRange || [min, max]);

  useEffect(() => {
    if (initialRange) {
      setRange(initialRange);
    }
  }, [initialRange]);

  const handleChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...range] as [number, number];
    newRange[index] = value;

    // Ensure min <= max
    if (index === 0 && value > range[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < range[0]) {
      newRange[0] = value;
    }

    setRange(newRange);
    onChange(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min (CHF)
          </label>
          <input
            type="number"
            min={min}
            max={max}
            value={range[0]}
            onChange={(e) => handleChange(0, Number(e.target.value))}
            className={cn(
              "w-full rounded-lg",
              "border-gray-300",
              "focus:ring-red-500 focus:border-red-500"
            )}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max (CHF)
          </label>
          <input
            type="number"
            min={min}
            max={max}
            value={range[1]}
            onChange={(e) => handleChange(1, Number(e.target.value))}
            className={cn(
              "w-full rounded-lg",
              "border-gray-300",
              "focus:ring-red-500 focus:border-red-500"
            )}
          />
        </div>
      </div>

      <div className="relative pt-1">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-red-500 rounded-full"
            style={{
              left: `${((range[0] - min) / (max - min)) * 100}%`,
              right: `${100 - ((range[1] - min) / (max - min)) * 100}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={range[0]}
          onChange={(e) => handleChange(0, Number(e.target.value))}
          className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range[1]}
          onChange={(e) => handleChange(1, Number(e.target.value))}
          className="absolute top-0 h-2 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}