import React, { useContext, useState } from "react";
import classes from "./Insurance.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/auth-context";
import { buyCover } from "../../api/insurance";

const Insurance = ({ insurance, isBuying, period, amount }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [disable, setDisable] = useState(false)

  const { id, name, logo, cost, capacity, chains } = insurance;

  let averageCost = +cost;

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
    // const insurance = {id, period, amount}
    setDisable(true)
    let startDate = new Date()
    let endDate = new Date()
    endDate.setDate(startDate.getDate() + period)

    const resp = await buyCover(id, userContext.userId, startDate,endDate)

    if (resp.success && resp.data.buyCover) {

      alert(`${resp.data.buyCover.name} Purchased`)
      navigate("/my-insurances");
    }

    // userContext.storeInsuranceToBuy(insurance)
    // navigate("/payments");
  };

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
        {isBuying ? (
          <button className={classes.button} onClick={getToPaymentHandler} disabled={disable}>
            Purchase
          </button>
        ) : (
          <button className={classes.button} onClick={getQuoteHandler}>
            Get quote
          </button>
        )}
      </div>
    </div>
  );
};

export default Insurance;
