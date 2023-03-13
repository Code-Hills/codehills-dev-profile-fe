import React from 'react';
import classes from "./LoginActivity.module.css";

const LoginActivity = () => {
  return (
    <section className={classes.login}>
      <div className={classes.loginLeft}>
        <div className={classes.loginHeader}>
          <h2>You will never regret to join Codehills</h2>
          <p>We're glad you're here! Please log in to explore all of our features</p>
        </div>
      
      </div>
      <div className={classes.loginRight}>Right</div>
    </section>
  );
};

export default LoginActivity;
