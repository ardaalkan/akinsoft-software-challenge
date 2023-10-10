import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className={styles.pageContainer}>
    <div className={styles.signUp}>
      <h1>Sign Up</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          className={styles.usernameInput}
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.usernameInput}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.usernameInput}
          id="password"
        />
        <button className={styles.buttonSignUp}>Sign Up</button>
      </form>
      <Link to={'/sign-in'}>
        <h2>Sign In</h2>
      </Link>
    </div>
    </div>
  );
}
