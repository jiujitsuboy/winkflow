import React from "react";
import Insurance from "../../components/insurance/Insurance";

const InsuranceDetails = ({ id }) => {
  const insurance = {
    name: "Aura",
    logo: "/aura.png",
    cost: "2.60%",
    capacity: "112 ETH/ 193.6k DAI",
    images: [
      {
        url: "/arbitrum.svg",
        name: "arbitrum",
      },
    ],
  };

  return (
    <div style={{padding: "1.5rem 6rem"}}>
     <div style={{padding: "1.5rem"}}>
      <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom:"1rem" }}>Buy cover</div>
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
              This product covers any token or combination of tokens you have in
              the protocol. In case of a claim, you'll receive the equivalent of
              your lost funds in ETH up to the covered amount. Alternatively you
              can select DAI.
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
                  <div style={{ color: "#0AB682" }}>30d 90d 1y</div>
                  <div>0 Days</div>
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
                  }}
                >
                  <div style={{ color: "#0AB682" }}>Max</div>
                  <div>0 ETH</div>
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
              This cover is not a contract of insurance. Cover is provided on a
              discretionary basis with Nexus Mutual members having the final say
              on which claims are paid.
            </p>
          </div>
        </div>
        <div>
          <Insurance insurance={insurance} />
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
