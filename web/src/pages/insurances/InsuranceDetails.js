import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Insurance from "../../components/insurance/Insurance";
import { getInsurance } from "../../api/insurance";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

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
    console.log("parametro llamado: ", id);
    getInsuranceById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "1.5rem 6rem" }}>
      {loading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <>
          <div style={{ padding: "1.5rem" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Buy cover
            </div>
            <div>Enter the amount you want to cover and for how long.</div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "1.3rem",
                  padding: "1.5rem",
                  margin: "10px",
                }}
              >
                <label style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Quote details
                </label>
                <p style={{ textAlign: "justify" }}>
                  This product covers any token or combination of tokens you
                  have in the protocol. In case of a claim, you'll receive the
                  equivalent of your lost funds in ETH up to the covered amount.
                  Alternatively you can select DAI.
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
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
                    <label>Period</label>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <button
                          style={{
                            color: "#0AB682",
                            fontSize: "1.1rem",
                            border: "0",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => {
                            setPeriod(30);
                          }}
                        >
                          30d
                        </button>
                        <button
                          style={{
                            color: "#0AB682",
                            fontSize: "1.1rem",
                            border: "0",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => {
                            setPeriod(90);
                          }}
                        >
                          90d
                        </button>
                        <button
                          style={{
                            color: "#0AB682",
                            fontSize: "1.1rem",
                            border: "0",
                            backgroundColor: "transparent",
                          }}
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
                          style={{
                            border: "0",
                            fontSize: "1.1rem",
                            textAlign: "right",
                            paddingRight: "1rem",
                            width: "7rem",
                          }}
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
                      style={{
                        display: "flex",
                        gap: "1rem",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
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
                          style={{
                            border: "0",
                            fontSize: "1.1rem",
                            textAlign: "right",
                            paddingRight: "1rem",
                            width: "7rem",
                          }}
                          maxLength="10"
                        />
                        <select style={{ border: "0", fontSize: "1.1rem" }}>
                          <option>ETH</option>
                          <option>DAI</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "1.3rem",
                  padding: "1.5rem",
                  margin: "10px",
                }}
              >
                <label style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Terms and conditions
                </label>
                <p style={{ textAlign: "justify" }}>Covered.</p>
                <ul>
                  <li>contract bugs</li>
                  <li>economic attacks, including oracle failures</li>
                  <li>governance attacks</li>
                </ul>
                <p style={{ textAlign: "justify" }}>Supported chains.</p>
                <ul>
                  <li>Ethereum</li>
                </ul>
                <p style={{ textAlign: "justify" }}>
                  This cover is not a contract of insurance. Cover is provided
                  on a discretionary basis with Nexus Mutual members having the
                  final say on which claims are paid.
                </p>
              </div>
            </div>
            <div>
              <Insurance insurance={insurance} isBuying={true} period={period} amount={amount} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InsuranceDetails;