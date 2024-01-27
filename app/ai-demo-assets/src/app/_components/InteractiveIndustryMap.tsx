"use client";
import React, { useState, useEffect, useRef } from "react";
import Hotspot from "./hotspot";
import { useRouter, useSearchParams } from "next/navigation";


// Titles of your industries
const industryTitles = [
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Finance",
  "Transportation",
  "Education",
  // ... add more titles if needed
];


interface Position {
  x: number;
  y: number;
}


const InteractiveIndustryMap: React.FC = () => {
  const [focusedIndustry, setFocusedIndustry] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [positions, setPositions] = useState<Position[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleFocus = (industryId: number) => {
    setFocusedIndustry(industryId);
  };

  const handleClick = (industryId: number) => {
    const industryTitle = industryTitles[industryId];
    router.replace(`/search?query=${encodeURIComponent(industryTitle!)}`);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Define margins and vertical offset
    const horizontalMargin = 50;
    const verticalMargin = 50;
    const verticalOffset = 0.40;

    // Function to generate random positions within constraints
    const generateRandomPositions = (count: number, width: number, height: number): Position[] => {
      return Array.from({ length: count }, () => ({
        x: horizontalMargin + Math.random() * (width - 2 * horizontalMargin),
        y: height * verticalOffset + Math.random() * (height * (1 - verticalOffset) - 2 * verticalMargin),
      }));
    };

    if (dimensions.width && dimensions.height) {
      setPositions(generateRandomPositions(industryTitles.length, dimensions.width, dimensions.height));
    }
  }, [dimensions]);

  return (
    <div ref={containerRef} className="fixed inset-0 flex justify-center items-center">
      {positions.map((position, index) => (
        <Hotspot
          key={index}
          id={index}
          title={industryTitles[index]!}
          x={position.x}
          y={position.y}
          onClick={() => handleClick(index)}
          onFocus={() => handleFocus(index)}
          onBlur={() => setFocusedIndustry(null)}
          isFocused={focusedIndustry === index}
        />
      ))}
    </div>
  );
};

export default InteractiveIndustryMap;
