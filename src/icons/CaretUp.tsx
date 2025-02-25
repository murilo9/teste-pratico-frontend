import { IconProps } from "../types/IconProps";

export default function CaretUpIcon({ size, color }: IconProps) {
  return (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 10.25L8 5.75L3.75 10.25"
        stroke={color || "white"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
