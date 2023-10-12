import { useState } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
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
      const res = await fetch("/api/auth/signin", {
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
      navigate('/');
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
        <h1>Sign In</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
        <Link to={"/sign-up"}>
          <h2>Sign Up</h2>
        </Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
