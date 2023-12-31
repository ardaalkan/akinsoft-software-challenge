  import { useState } from "react";
  import styles from "./SignIn.module.css";
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import {
    signInStart,
    signInSuccess,
    signInFailure,
  } from "../../redux/user/userSlice";

  export default function SignIn() {
    const [formData, setFormData] = useState({}); // Kullanıcının giriş bilgilerini saklayan bir durum
    const { loading, error } = useSelector((state) => state.user); // Redux ile giriş işlemi hakkında bilgi alınır
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Kullanıcının giriş bilgilerini güncellemek için kullanılan bir fonksiyon
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    // Giriş formu gönderildiğinde çalışan fonksiyon
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate("/");
        console.log(data);
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };

    return (
      <div className={styles.pageContainer}>
        <div className={styles.signUp}>
          <h1>Sign In</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              {loading ? "Loading" : "Sign In"}
            </button>
          </form>
          <Link to={"/sign-up"}>
            <h2>Sign Up</h2>
          </Link>
        </div>
        {error && <p className={styles.errorContainer}>{error}</p>}{" "}
        {/* Hata mesajı gösterilir */}
      </div>
    );
  }
