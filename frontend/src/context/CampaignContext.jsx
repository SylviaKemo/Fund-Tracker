import { createContext, useReducer } from "react";

export const CampaignsContext = createContext();

export const campaignsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CAMPAIGNS":
      return {
        campaigns: action.payload,
      };
    case "CREATE_CAMPAIGN":
      return {
        campaigns: [action.payload, ...(state.campaigns || [])],
      };
    case "UPDATE_CAMPAIGN":
      return {
        campaigns: state.campaigns.map((campaign) =>
          campaign._id === action.payload._id ? action.payload : campaign
        ),
      };
    case "DELETE_CAMPAIGN":
      return {
        campaigns: state.campaigns.filter(
          (campaign) => campaign._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const CampaignsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(campaignsReducer, {
    campaigns: [],
  });

  return (
    <CampaignsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CampaignsContext.Provider>
  );
};
