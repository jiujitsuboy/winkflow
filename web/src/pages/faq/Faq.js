import React, { Fragment } from "react";
import classes from "./Faq.module.css";

const Faq = () => {
  return (
    <Fragment>
      <div className={classes.main_label}>Frequently Asked Questions</div>
      <div className={classes.list_container}>
        <ol className={classes.list}>
          <li>
            <div className={classes.list_question}>How My insurace works?</div>
            <div className={classes.list_answer}>Rta. You pay for the chains you want us to cover.</div>
          </li>
          <li>
            <div className={classes.list_question}>How do I pay for my insurances?</div>
            <div className={classes.list_answer}>Rta. You can pay using your credit card.</div>
          </li>
        </ol>
      </div>
    </Fragment>
  );
};

export default Faq;
