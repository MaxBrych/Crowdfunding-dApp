import { ConnectWallet } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Campaign, useStateContext } from "../context";
import styles from "../styles/Home.module.css";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <main className="flex w-full min-h-screen text-black bg-white">
        {/* <div className="flex items-start justify-start ">
          <Sidebar />
  </div>*/}
        <div className="w-full">
          <h1 className="mt-4 text-3xl">Fund3</h1>
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

export default Home;
