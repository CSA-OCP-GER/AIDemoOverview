import { useMemo, useState } from "react";

interface HotspotProps {
  id: number;
  title: string;
  x: number; // x-coordinate in pixels
  y: number; // y-coordinate in pixels
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
}

const Hotspot: React.FC<HotspotProps> = ({
  id,
  title,
  x,
  y,
  onClick,
  onFocus,
  onBlur,
  isFocused,
}) => {
  const lineLength = 70; // Adjusted for the viewBox size
  const centerX = 80; // Center x-coordinate in the viewBox
  const centerY = 50; // Center y-coordinate in the viewBox
  const lineStartX = centerX;
  const lineStartY = centerY;
  const lineEndX = centerX;
  const lineEndY = centerY + lineLength; // Line goes down from the center

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Define a function to calculate the scale based on the y-coordinate
  const calculateRadius = (yValue: number) => {
    const minScale = -0.1; // The scale at the bottom of the image
    const maxScale = 1.5; // The scale at the top of the image
    const yRange = 1200; // The range of y-coordinates
    return minScale + (maxScale - minScale) * (yValue / yRange);
  };

  // Use useMemo to avoid recalculating the scale unnecessarily
  const radiusScale = useMemo(() => calculateRadius(y), [y]);

  // Generate a random delay between 0s and 2s
  const animationDelay = useMemo(() => `${Math.random() * 10}s`, []);

  // Inline style for the circles to apply the random animation delay
  const circleStyle = {
    animationDelay: animationDelay,
  };

  return (
    <svg
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={id}
      width="200"
      height="140"
      viewBox="0 0 200 140"
      className={`absolute cursor-pointer ${isFocused ? "ring-opacity-10" : "ring-opacity-0"} transition-all`}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={lineEndX}
        y2={lineEndY}
        stroke="white"
        opacity={isFocused ? 0.2 : 0.2}
        strokeWidth="1"
      />
      <text
        x={centerX + 20} // Position the text to the right of the center
        y={centerY} // Align the text vertically with the center
        fill="white"
        fontSize="12"
        scale={radiusScale}
        textAnchor="start" // Align the text to the start (left side)
        dominantBaseline="central"
        className={`text-industry ${hovered ? "text-hovered" : ""}`}
      >
        {title}
      </text>

      <title>{title}</title>
      <circle
        cx={centerX}
        cy={centerY}
        r={50 * radiusScale}
        fill="white"
        fillOpacity="0.1"
        className={`third-circle ${isFocused ? "focused" : ""}`}
      />

      <circle
        cx={centerX}
        cy={centerY}
        r={10 * radiusScale}
        fill="white"
        fillOpacity="0.9"
        className="inner-circle"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={25 * radiusScale}
        fill="white"
        fillOpacity="0.4"
        className="inner-circle"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={20 * radiusScale}
        fill="white"
        fillOpacity="0.3"
        style={circleStyle} // Apply the random delay here

        className={`outer-circle ${isFocused ? "focused" : ""}`}
      />
    </svg>
  );
};

export default Hotspot;
