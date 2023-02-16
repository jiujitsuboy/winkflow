import React from "react";
import classes from "./Insurance.module.css"
import {useNavigate} from "react-router-dom"

const Insurance = ({ insurance }) => {
  const navigate = useNavigate()
  const { name, logo, cost, capacity, images } = insurance;

  const getQuoteHandler = ()=>{
    alert(JSON.stringify({ name, logo, cost, capacity, images }))
    navigate("/insurances-details")
  }

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
            {images.map((image) => (
            <img className={classes.features_logo} src={image.url} alt={image.name}></img>
            ))}
        </div>        
      </div>
      <div className={classes.features}>
        <label>Yearly cost:</label>
        <label>{cost}</label>
      </div>
      <div className={classes.features}>
        <label>Capacity</label>
        <label>{capacity}</label>
      </div>
      <div className={classes.button_container}>
        <button className={classes.button} onClick={getQuoteHandler}>Get quote</button>
      </div>
    </div>
  );
};

export default Insurance;
