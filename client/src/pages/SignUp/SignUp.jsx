import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({}); // Kullanıcının kayıt bilgilerini saklayan bir durum
  const [error, setError] = useState(null); // Hata mesajı saklanır
  const [loading, setLoading] = useState(false); // Kayıt işlemi sırasında yüklenme durumu saklanır
  const navigate = useNavigate();

  // Kullanıcının kayıt bilgilerini güncellemek için kullanılan bir fonksiyon
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Kayıt formu gönderildiğinde çalışan fonksiyon
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
      navigate("/sign-in");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.signUp}>
        <h1>Sign Up</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className={styles.usernameInput}
            id="Choose a username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Type your email address"
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
        <div>
          <Link to={"/sign-in"}>
            <h2>Sign In</h2>
          </Link>
        </div>
      </div>
      {error && <p>{error}</p>} {/* Hata mesajı gösterilir */}
    </div>
  );
}
