import React, { useContext, useEffect, useState } from "react";
import classes from "./Insurance.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/auth-context";
// import { calculateCost } from "/utils/common"

const Insurance = ({ insurance, isBuying, period, amount, hideButton }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [disable, setDisable] = useState(false)

  const { id, name, logo, cost, capacity, chains } = insurance;
  
  let averageCost = +cost * (amount ? +amount : 1);

  if (period) {
    const rate = period / 365;
    if (rate > 1) {
      averageCost = cost - (cost * 0.5)
    } else {
      averageCost = cost + cost * (1 - rate)
    }
  }

  averageCost = averageCost.toFixed(2)


  const getQuoteHandler = () => {
    navigate(`/insurances-details/${id}`);
  };

  const getToPaymentHandler = async() => {
    setDisable(true)
    const curruntInsurance = {insurance, period, amount}
    
    userContext.storeInsuranceToBuy(curruntInsurance)
    navigate("/checkout-payment");
  };

  useEffect(()=>{
    setDisable(period<1 || amount<1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[period,amount])

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img className={classes.header_logo} src={logo} alt="chain"></img>
        <div className={classes.header_text}>
          <label className={classes.header_text__title}>{name}</label>
          <label>Protocol</label>
        </div>
      </div>
      <div className={classes.features}>
        <label>Chains:</label>
        <div>
          {chains.map((chain, index) => (
            <img
              key={index}
              className={classes.features_logo}
              src={chain.url}
              alt={chain.name}
            ></img>
          ))}
        </div>
      </div>
      <div className={classes.features}>
        <label>Yearly cost:</label>
        <label>{averageCost}</label>
      </div>
      <div className={classes.features}>
        <label>Capacity</label>
        <label>{capacity}</label>
      </div>
      <div className={classes.button_container}>
        {!hideButton ? isBuying ? (
          <button className={classes.button} onClick={getToPaymentHandler} disabled={disable}>
            Purchase
          </button>
        ) : (
          <button className={classes.button} onClick={getQuoteHandler}>
            Get quote
          </button>
        ):null}
      </div>
    </div>
  );
};

export default Insurance;
