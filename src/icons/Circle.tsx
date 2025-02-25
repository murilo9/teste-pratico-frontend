import { IconProps } from "../types/IconProps";

export default function CircleIcon({ size, color }: IconProps) {
  return (
    <svg
      width={size || "9"}
      height={size || "9"}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.5" cy="4.5" r="4" fill={color || "white"} />
    </svg>
  );
}
