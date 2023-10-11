import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  console.log(formData);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signUp}>
        <h1>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className={styles.usernameInput}
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.usernameInput}
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.usernameInput}
            id="password"
            onChange={handleChange}
          />
          <button disabled={loading} className={styles.buttonSignUp}>
            {loading ? "Loading" : "Sign Up"}
          </button>
        </form>
        <Link to={"/sign-in"}>
          <h2>Sign In</h2>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
