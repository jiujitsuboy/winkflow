import React, { Fragment } from 'react'
import classes from "./TermsAndContidionts.module.css";

const TermsAndContidionts = () => {
  return (
    <Fragment>
      <div className={classes.main_label}>Terms And Contidionts</div>
      <div className={classes.section_container}>
        <p className={classes.section}>
          Terms of usage
        </p>
      </div>
    </Fragment>
  )
}

export default TermsAndContidionts