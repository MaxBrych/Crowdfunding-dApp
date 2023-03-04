import React, { useState } from "react";
import type { NextPage } from "next";
import logo from "../../public/assets/logo.svg";
import sun from "../../public/assets/sun.svg";
import { navlinks } from "../constants";
import Link from "next/link";
import { useRouter } from "next/router";

interface IconProps {
  styles: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick: () => void;
}

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar: NextPage = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="sm:flex justify-center items-center flex-col sticky top-5 h-[93vh] hidden ">
      <Link href="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imgUrl={logo}
          handleClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              styles={""}
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  router.push(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
          handleClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
};
export default Sidebar;
