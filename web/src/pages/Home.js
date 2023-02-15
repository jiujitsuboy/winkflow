import React from 'react'
import classes from "./Home.module.css"

const Home = () => {
  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header_main}>Industry Leading</div>
        <div className={classes.header_main}>On-chain protections</div>
        <div className={classes.header_less}>My Insurances is the insurance alternative for crypto and more.</div>
      </div>
      <img src="/logo-site.png" alt="logo"/>
    </div>
  )
}

export default Home