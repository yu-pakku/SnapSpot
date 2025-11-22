interface ButtonProps {
  size: "large" | "normal";
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  size,
  text, 
  icon,
  className,
  onClick,
}: ButtonProps) {
  const width = 
    size === "large" 
      ? "w-[345px]"
      : "w-78"

  return (
    <button
      className={`
        ${className} ${width}
        flex justify-center items-center gap-2 h-14 bg-castle-green200 text-white Body14Medium rounded-lg cursor-pointer
      `}
      onClick={() => onClick?.()}
    >
      {text}
      {icon}
    </button>
  );
}