import React from 'react'
import classes from "./LogUserInfo.module.css"

const LogUserInfo = ({user, logout}) => {
  return (
    <div className={classes.user_profile}>
          <img className={classes.user_profile__picture} src={user.picture} alt={user.name}/>
          <div>
            <div className={classes.user_profile__name}>{user.name}</div>
            <button className={classes.logout} onClick={logout}>Logout</button>
          </div>
    </div>
  )
}

export default LogUserInfo