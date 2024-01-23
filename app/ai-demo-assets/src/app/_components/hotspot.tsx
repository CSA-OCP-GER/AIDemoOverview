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
  const lineLength = 70;
  const lineEndX = x + lineLength;
  const lineEndY = y;

  return (
    <svg
      key={id}
      width="50"
      height="50"
      viewBox="0 0 100 100"
      className={`absolute cursor-pointer ${isFocused ? "ring-opacity-100" : "ring-opacity-0"} transition-all`}
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: "white", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <line
        x1="100"
        y1="100"
        x2="100"
        y2={lineEndY}
        stroke={`url(#gradient-${id})`}
        strokeWidth="2"
      />
      <text
        x="100"
        y={lineEndY - 10}
        fill="white"
        fontSize="12"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {title}
      </text>

      <title>{title}</title>
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="white"
        fillOpacity="0.1"
        className={`third-circle ${isFocused ? "focused" : ""}`}
      />

      <circle
        cx="50"
        cy="50"
        r="10"
        fill="white"
        fillOpacity="0.4"
        className="inner-circle"
      />
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="white"
        fillOpacity="0.3"
        className={`outer-circle ${isFocused ? "focused" : ""}`}
      />
      
    </svg>
  );
};

export default Hotspot;
