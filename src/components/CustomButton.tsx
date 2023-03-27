import React, { FC, MouseEvent } from "react";

interface ButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Make handleClick optional
  styles?: string;
}

const CustomButton: FC<ButtonProps> = ({
  btnType,
  title,
  handleClick,
  styles,
}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
