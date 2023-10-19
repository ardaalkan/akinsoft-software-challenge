import styles from "./Home.module.css";
import { LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleShowListings = async () => {
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    setUserListings(data);
  };

  useEffect(() => {
    handleShowListings(); // Sayfa yüklendiğinde listeleri getirir.
  }, []); // bağımlılık dizisi ve ingilizcede "dependency array" olarak geçer.

  const numberOfListings = userListings.length;

  return (
    <div className={styles.container}>
      <h1 className={styles.main}>
        <LayoutDashboard
          size={32}
          strokeWidth={3}
          style={{
            marginRight: "20px",
            marginTop: "15px",
            marginBottom: "50px",
          }}
        />
        Dashboard
      </h1>
      <div className={styles.box}>
        <p className={styles.boxInfo}>
          Total <br />
          Survey
          <br />
          {numberOfListings}
        </p>
      </div>
    </div>
  );
}
