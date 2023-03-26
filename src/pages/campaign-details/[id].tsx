import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import Image from "next/image";
import { useStateContext } from "../../context";
import { calculateBarPercentage, daysLeft } from "../../utils";
import Loader from "../../components/Loader";
import CustomButton from "../../components/CustomButton";
import Navbar from "../../components/Navbar";
import CountBox from "../../components/CountBox";

interface CampaignProps {
  title: React.ReactNode;
  pId: string;
  name: string;
  image: string;
  description: string;
  target: number;
  amountCollected: number;
  deadline: string;
  owner: string;
}

interface Donator {
  donator: string;
  donation: ethers.BigNumber;
}

interface CountProps {
  title: string;
  value: number;
}

const CampaignDetails: React.FC = () => {
  const router = useRouter();
  const { pId } = router.query;
  const [campaign, setCampaign] = useState<CampaignProps | null>(null);
  const { donate, getDonations, contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<Donator[]>([]);

  useEffect(() => {
    if (router.query.campaign) {
      const campaignData = JSON.parse(router.query.campaign as string);
      setCampaign(campaignData);
    }
  }, [router.query]);

  useEffect(() => {
    if (contract && address) {
      fetchDonators();
    }
  }, [contract, address]);

  const fetchDonators = async () => {
    if (campaign && pId) {
      const data = await getDonations(pId);
      setDonators(data);
    }
  };

  useEffect(() => {
    if (contract && address && campaign) {
      // Check if campaign is not null
      fetchDonators();
    }
  }, [contract, address, campaign]); // Include campaign as a dependency

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(campaign?.pId, amount);
    setIsLoading(false);
    router.push("/");
  };

  if (!campaign) {
    return <Loader />;
  }

  const remainingDays = daysLeft(campaign.deadline);

  return (
    <div>
      <Navbar />
      <Image
        className="border rounded-xl"
        src={campaign.image}
        alt="loader"
        width={720}
        height={720}
        objectFit="contain"
      />
      <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
        <div
          className="absolute h-full bg-[#4acd8d]"
          style={{
            width: `${calculateBarPercentage(
              campaign.target,
              campaign.amountCollected
            )}%`,
            maxWidth: "100%",
          }}
        ></div>
      </div>
      <CountBox title="Days Left" value={remainingDays} />
      <CountBox title="Days Left" value={remainingDays.toString()} />{" "}
      {/*change back to number when error occurs!! */}
      <CountBox
        title={`Raised of ${campaign.target}`}
        value={campaign.amountCollected.toString()}
      />
      <CountBox
        title="Total Backers"
        value={(donators ? donators.length : 0).toString()}
      />
      <h1>{campaign.title}</h1>
      <p>{campaign.description}</p>
      <p>Target amount: {campaign.target}</p>
      <div>
        <p>Owner: {campaign.owner}</p>
        <Image src={""} alt={""} />
      </div>
      {/* display other campaign details */}
      <h2>Donators:</h2>
      {donators.length > 0 ? (
        donators.map((item) => (
          <p key={item.donator}>
            {item.donator}: {item.donation.toString()}
          </p>
        ))
      ) : (
        <p>No donators yet</p>
      )}
      <input
        className="h-10 border border-gray-300 rounded-md "
        type="number"
        placeholder="ETH 0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <CustomButton
        btnType="button"
        title="Fund Campaign"
        styles="w-full bg-[#8c6dfd]"
        handleClick={handleDonate}
      />
    </div>
  );
};

export default CampaignDetails;
