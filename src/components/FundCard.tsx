import React from "react";
import { daysLeft } from "../utils";
import Image from "next/image";
import { ethers } from "ethers";

type FundCardProps = {
  owner: string;
  title: string;
  description: string;
  target: ethers.BigNumber;
  deadline: any;
  amountCollected: string;
  image: string;
  handleClick: () => void;
};

const FundCard: React.FC<FundCardProps> = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft({ deadline }); // pass as object with deadline property

  return (
    <div
      className="sm:w-[288px] w-full  bg-white rounded-xl border border-gray-400 cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={image}
        width={288}
        height={158}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <Image
            src={""}
            width={17}
            height={17}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] ">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px]  text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal  text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px]  leading-[22px]">
              {ethers.utils.formatEther(
                ethers.utils.parseEther(Number(amountCollected).toFixed(18))
              )}{" "}
              ETH
            </h4>

            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px]  sm:max-w-[120px] truncate">
              Raised of {ethers.utils.formatEther(target.toString())} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px]  leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px]  sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center ">
            <Image src={""} alt="user" className="object-contain w-1/2 h-1/2" />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px]  truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
