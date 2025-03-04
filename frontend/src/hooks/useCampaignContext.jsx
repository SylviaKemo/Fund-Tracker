import { CampaignsContext } from "../context/CampaignContext";
import { useContext } from "react";

export const useCampaignsContext = () => {
  const context = useContext(CampaignsContext);

  if (!context) {
    throw Error(
      "useCampaignsContext must be used inside an CampaignsContextProvider"
    );
  }
  return context;
};
