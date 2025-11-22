interface ButtonProps {
  size: string;
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
  return (
    <button
      className={`
        ${className} ${size}
        flex justify-center items-center gap-2 h-14 bg-castle-green200 text-white Body14Medium rounded-lg cursor-pointer
      `}
      onClick={() => onClick?.()}
    >
      {text}
      {icon}
    </button>
  );
}