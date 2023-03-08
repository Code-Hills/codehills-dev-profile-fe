import React from 'react';
import classes from "./LoginActivity.module.css";
import logo from "../../../img/logo.png";

const LoginActivity = () => {
  return (
    <section className={classes.login}>
      <div className={classes.loginLeft}>
        <div className={classes.loginHeader}>
          <h2>You will never regret to join Codehills</h2>
          <p>We're glad you're here! Please log in to explore all of our features</p>
        </div>

      </div>
      <div className={classes.loginRight}>
        <div className={classes.righDdata}>
          <div className={classes.imgContainer}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={classes.loginwelcome}>
            <h2>Welcome</h2>
          </div>
          <div>
            <button>Loggin With microseoft</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginActivity;
