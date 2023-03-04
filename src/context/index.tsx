import { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { BigNumberish, ethers } from "ethers";
import useEffect from "react";

type CampaignForm = {
  title: string;
  description: string;
  target: number;
  deadline: string;
  image: string;
};

type StateContextProps = {
  address: string;
  contract: ethers.Contract;
  createCampaign: (form: CampaignForm) => Promise<void>;
  getCampaigns: () => Promise<void>;
  getUserCampaigns: () => Promise<void>;
  connect: () => void;
  disconnect: () => void;
};

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

export const StateContext = createContext<StateContextProps>({
  address: "",
  contract: undefined,
  createCampaign: null,
});

type StateContextProviderProps = {
  children: React.ReactNode;
};

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x16fC7230dD357d2485F461A52596Af7e62ea310E"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: any) => {
    try {
      const data = await createCampaign([
        address, //owner
        form.title, //title
        form.description, //description
        form.target, //goal value
        new Date(form.deadline).getTime(), //end date
        form.image, // img-url
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async (): Promise<void> => {
    const campaigns = await contract.call("getCampaigns");
    const parsedCampaigns: Campaign[] = campaigns.map(
      (campaign: any, i: any): Campaign => {
        return {
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        };
      }
    );
    return parsedCampaigns;
  };
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (pId: BigNumberish, amount: string) => {
    if (!amount || isNaN(parseFloat(amount))) {
      throw new Error("Invalid amount");
    }
    const data = await contract.call("donateCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId: string) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parseDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parseDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
      return parseDonations;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
