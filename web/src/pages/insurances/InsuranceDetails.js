import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Insurance from "../../components/insurance/Insurance";
import { getInsurance } from "../../api/insurance";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import TermsAndContidionts from "../../components/terms/TermsAndContidionts";
import classes from "./InsuranceDetails.module.css";

const defaultInsurance = {
  name: "",
  logo: "",
  cost: "",
  capacity: "",
  chains: [
    {
      url: "",
      name: "",
    },
  ],
};

const InsuranceDetails = () => {
  const { id } = useParams();
  const [insurance, setInsurance] = useState(defaultInsurance);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState(0);
  const [amount, setAmount] = useState(0);

  const isNumber = (value, setValue) => {
    const conversion = +value;
    if (!isNaN(conversion)) {
      setValue(conversion);
    }
  };

  const getInsuranceById = async (id) => {
    setLoading(true);
    const resp = await getInsurance(id);
    if (resp.success && resp.data.getInsurance) {
      const insurance = resp.data.getInsurance;
      setInsurance(insurance);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInsuranceById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      {loading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <>
          <div className={classes.main_container}>
            <div className={classes.main_container__label}>Buy cover</div>
            <div>Enter the amount you want to cover and for how long.</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <div className={classes.quotes_container}>
                <label className={classes.quotes_label}>Quote details</label>
                <p style={{ textAlign: "justify" }}>
                  This product covers any token or combination of tokens you
                  have in the protocol. In case of a claim, you'll receive the
                  equivalent of your lost funds in ETH up to the covered amount.
                  Alternatively you can select DAI.
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div className={classes.period_container}>
                    <label>Period</label>
                    <div
                      className={classes.quotes__inner_label}
                    >
                      <div style={{ textAlign: "right" }}>
                        <button
                          className={classes.period__label_button}
                          onClick={() => {
                            setPeriod(30);
                          }}
                        >
                          30d
                        </button>
                        <button
                          className={classes.period__label_button}
                          onClick={() => {
                            setPeriod(90);
                          }}
                        >
                          90d
                        </button>
                        <button
                          className={classes.period__label_button}
                          onClick={() => {
                            setPeriod(365);
                          }}
                        >
                          1y
                        </button>
                      </div>
                      <div style={{ display: "flex" }}>
                        <input
                          type="text"
                          value={period}
                          onChange={(event) => {
                            isNumber(event.target.value, setPeriod);
                          }}
                          placeholder="0"
                          className={classes.input__text}
                          maxLength="10"
                        />
                        <label>Days</label>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid #ccc",
                      borderRadius: "1.3rem",
                      padding: "1.5rem",
                      justifyContent: "space-between",
                      width: "50%",
                    }}
                  >
                    <label>Amount</label>
                    <div
                      className={classes.quotes__inner_label}
                    >
                      <div style={{ color: "#0AB682" }}>Max</div>
                      <div>
                        <input
                          type="text"
                          value={amount}
                          onChange={(event) => {
                            isNumber(event.target.value, setAmount);
                          }}
                          placeholder="0"
                          className={classes.input__text}
                          maxLength="10"
                        />
                        <select className={classes.select}>
                          <option>ETH</option>
                          <option>DAI</option>
                        </select>
                      </div>
                      {amount < 5 && (
                        <label style={{ color: "red" }}>
                          Should be greater than 5
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <TermsAndContidionts />
            </div>
            <div>
              <Insurance
                insurance={insurance}
                isBuying={true}
                period={period}
                amount={amount}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InsuranceDetails;
