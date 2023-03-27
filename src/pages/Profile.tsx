import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useStateContext, Campaign } from "../context"; // Import the Campaign type from context
import styles from "../styles/Home.module.css";

import { ethers } from "ethers";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data: Campaign[] = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <main className="flex w-full min-h-screen ">
        <div className="w-full">
          <h1 className="mt-4 text-3xl">Crowdfunding dAPP</h1>
          <Navbar />
          <DisplayCampaigns
            title="Active Campaigns"
            isLoading={isLoading}
            campaigns={campaigns}
          />
        </div>
      </main>
    </div>
  );
};

export default Profile;
