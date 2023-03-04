import dashboard from "../../public/assets/dashboard.svg";
import createCampaign from "../../public/assets/create-campaign.svg";
import payment from "../../public/assets/payment.svg";
import profile from "../../public/assets/profile.svg";
import withdraw from "../../public/assets/withdraw.svg";
import logout from "../../public/assets/logout.svg";

interface NavLink {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
}

export const navlinks: NavLink[] = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/CreateCampaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/Profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];
