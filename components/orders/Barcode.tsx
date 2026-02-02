'use client';

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

// Simple barcode generator - creates a visual barcode pattern
export default function Barcode({ value, width = 200, height = 25 }: BarcodeProps) {
  // Generate bar pattern from order number
  const generateBars = () => {
    const bars: Array<{ width: number; x: number }> = [];
    let x = 0;
    
    // Use order number to generate consistent bar pattern
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    for (let i = 0; i < value.length * 2; i++) {
      const barWidth = ((seed + i) % 3) + 1; // Bar width between 1-3
      bars.push({ width: barWidth, x });
      x += barWidth + 1; // Add spacing between bars
    }
    
    return bars;
  };

  const bars = generateBars();
  const totalWidth = bars[bars.length - 1]?.x + bars[bars.length - 1]?.width || width;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={totalWidth}
        height={height}
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full max-w-[200px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Start guard pattern */}
        <rect x="0" y="0" width="2" height={height} fill="black" />
        <rect x="3" y="0" width="1" height={height} fill="black" />
        
        {/* Barcode bars */}
        {bars.map((bar, index) => (
          <rect
            key={index}
            x={bar.x + 5}
            y="0"
            width={bar.width}
            height={height}
            fill="black"
          />
        ))}
        
        {/* End guard pattern */}
        <rect x={totalWidth - 3} y="0" width="1" height={height} fill="black" />
        <rect x={totalWidth - 1} y="0" width="2" height={height} fill="black" />
      </svg>
      <p className="text-[8px] text-gray-500 text-center mt-1 font-mono tracking-wider">
        {value}
      </p>
    </div>
  );
}

