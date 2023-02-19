import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext({
  userId: 0,
  insuranceToBuy:null,
  getUserToken: ()=>{},
  storeUserId: (userId)=>{},
  storeInsuranceToBuy: (insurance)=>{}
});

const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(0)
  const [insurance, setInsurance] = useState(null)
  const { getAccessTokenSilently } = useAuth0();

  const storeUserId = (value)=>{
    setUserId(value)
  }

  const getUserToken = ()=>{
    return getAccessTokenSilently()    
  }

  const storeInsuranceToBuy = (value)=>{
    setInsurance(value)
  }

  const contextValue = {
    userId,
    insurance,
    getUserToken,
    storeUserId,
    storeInsuranceToBuy
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;
