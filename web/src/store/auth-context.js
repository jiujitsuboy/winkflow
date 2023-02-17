import React, { useState } from "react";

const UserContext = React.createContext({
  userId: 0,
  insuranceToBuy:null,
  storeUserId: (userId)=>{},
  storeInsuranceToBuy: (insurance)=>{}
});

const UserContextProvider = (props) => {
  const [userId, setUserId] = useState(0)
  const [insurance, setInsurance] = useState(null)

  const storeUserId = (value)=>{
    setUserId(value)
  }

  const storeInsuranceToBuy = (value)=>{
    setInsurance(value)
  }

  const contextValue = {
    userId,
    insurance,
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
