"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Hotspot from "./hotspot";
import { useRouter, useSearchParams } from "next/navigation";

// Define an interface for the industry data
interface Industry {
  id: number;
  title: string;
  x: number; // x-coordinate as a percentage of the image width
  y: number; // y-coordinate as a percentage of the image height
}
// Function to generate an array with numbers from start to end
const generateNumberArray = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };
  
  // Function to shuffle an array
  const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex]!, array[currentIndex]!];
    }
  
    return array;
  };
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
  
  // Generate and shuffle the arrays for x and y coordinates
  const xCoordinates = shuffleArray(generateNumberArray(10, 90));
  const yCoordinates = shuffleArray(generateNumberArray(35, 80));
  
  // Map over the titles to create the industries array
  const industries: Industry[] = industryTitles.map((title, index) => ({
    id: index + 1,
    title: title,
    x: xCoordinates[index]!, // Use the non-null assertion since we know the array is fully populated
    y: yCoordinates[index]!, // Use the non-null assertion for the same reason
  }));
  

const InteractiveIndustryMap: React.FC = () => {
  const [focusedIndustry, setFocusedIndustry] = useState<number | null>(null);
  const [, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null); // Ref for the div wrapping the image

  const searchParams = useSearchParams();


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = industries.findIndex(
        (industry) => industry.id === focusedIndustry,
      );
      let nextIndex: number;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % industries.length;
          break;
        case "ArrowLeft":
          nextIndex =
            (currentIndex - 1 + industries.length) % industries.length;
          break;
        default:
          return;
      }

      // Check if the industry exists before setting the focused industry
      const nextIndustry = industries[nextIndex];
      if (nextIndustry) {
        setFocusedIndustry(nextIndustry.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndustry]);

  const handleFocus = (industryId: number) => {
    setFocusedIndustry(industryId);
  };

  const handleClick = (industryId: number) => {
    console.log(`Navigate to the page of industry ID: ${industryId}`);
    // Implement the navigation logic here

    // navigate to search?query=industry title
    const params = new URLSearchParams(searchParams);
    params.set("query", industryTitles[industryId - 1]!);


    replace(`search?${params.toString()}`);

    

  


  };


  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();


  // Function to calculate the position based on image dimensions
  const calculatePosition = (percentageX: number, percentageY: number) => {
    if (imageRef.current) {
      const { offsetWidth, offsetHeight } = imageRef.current;
      return {
        x: offsetWidth * percentageX,
        y: offsetHeight * percentageY,
      };
    }
    return { x: 0, y: 0 };
  };

  return (
    <div className="relative h-auto w-full" ref={imageRef}>
      {/* Background image */}
      <Image
        width={2400}
        height={1350}
        src="/piotr-chrobot-6oUsyeYXgTg-unsplash.jpg"
        alt="Industry Map"
        className="h-auto w-full rounded-lg object-cover"
        onLoad={() => setImageLoaded(true)} // Set the imageLoaded state to true when the image has loaded

      />
      {/* Hotspots */}
      <div className="absolute left-0 top-0 h-full w-full">
        {industries.map((industry) => {
          const { x, y } = calculatePosition(
            industry.x / 100,
            industry.y / 100,
          );
          // const x = imageRef.current ? imageRef.current.offsetWidth * (industry.x / 100) : 0;
          // const y = imageRef.current ? imageRef.current.offsetHeight * (industry.y / 100) : 0;

          return (
            <Hotspot
              key={industry.id}
              id={industry.id}
              title={industry.title}
              x={x}
              y={y}
              onClick={() => handleClick(industry.id)}
              onFocus={() => handleFocus(industry.id)}
              onBlur={() => setFocusedIndustry(null)}
              isFocused={focusedIndustry === industry.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveIndustryMap;
