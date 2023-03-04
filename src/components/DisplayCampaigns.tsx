import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import FundCard from "./FundCard";
import loader from "../../public/assets/loader.svg";
//import CampaignDetails from "../pages/campaign-details/CampaignDetails";

type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: string;
  amountCollected: number;
  image: string;
};

type Props = {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
};

const DisplayCampaigns: React.FC<Props> = ({ title, isLoading, campaigns }) => {
  const router = useRouter();

  const handleNavigate = (campaign: Campaign) => {
    router.push({
      pathname: `/campaign-details/${campaign.title}`,
      query: { campaign: JSON.stringify(campaign) },
    });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && campaigns.length > 0 && (
          <Image
            src={campaigns[0].image}
            alt="loader"
            width={100}
            height={100}
            objectFit="contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.title}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
