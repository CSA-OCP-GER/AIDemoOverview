import { useState } from "react";

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
    const centerX = 100; // Center x-coordinate in the viewBox
    const centerY = 90; // Center y-coordinate in the viewBox
    const lineStartX = centerX;
    const lineStartY = centerY;
    const lineEndX = centerX;
    const lineEndY = centerY - lineLength; // Line goes up from the center
  
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };

  return (
    <svg
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
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
        x={lineEndX}
        y={lineEndY - 10} // Adjust the y position to place the text above the line
        fill="white"
        fontSize="12"
        textAnchor="middle"
        dominantBaseline="central"
        className={`text-industry ${hovered ? 'text-hovered' : ''}`}>
        {title}
      </text>


      <title>{title}</title>
      <circle
        cx={centerX}
        cy={centerY}
        r="50"
        fill="white"
        fillOpacity="0.1"
        className={`third-circle ${isFocused ? "focused" : ""}`}
      />

      <circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="white"
        fillOpacity="0.4"
        className="inner-circle"
      />
      <circle
        cx={centerX}
        cy={centerY}
        r="30"
        fill="white"
        fillOpacity="0.3"
        className={`outer-circle ${isFocused ? "focused" : ""}`}
      />
      
    </svg>
  );
};

export default Hotspot;
