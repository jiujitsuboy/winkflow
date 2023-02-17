import React, { Fragment } from "react";
import classes from "./TermsAndContidionts.module.css";

const TermsAndContidionts = () => {
  return (
    <Fragment>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "1.3rem",
        }}
      >
        <div>
          <p className={classes.section}>
            <h2>Terms and conditions</h2>
            <h3>Covered:</h3>
            <ul>
              <li>contract bugs</li>
              <li>economic attacks, including oracle failures</li>
              <li>governance attacks</li>
            </ul>
            <h3>Supported chains:</h3>
            <div>
              <img src="/chains/eth2.jpeg" alt="ethereum" width="20px" />{" "}
              Ethereum
            </div>
            <h3>Claiming:</h3>
            <ul>
              <li>
                You must provide proof of the incurred loss at claim time.
              </li>
              <li>
                You should wait 72 hours after the event, so assessors have all
                details to make a decision.
              </li>
              <li>
                You can claim up to 35 days after the cover period expires,
                given your cover was active when the incident happened.
              </li>
            </ul>
            <p>
              This cover is not a contract of insurance. Cover is provided on a
              discretionary basis with Nexus Mutual members having the final say
              on which claims are paid. Check out full details
            </p>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndContidionts;
