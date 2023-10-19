import styles from "./Home.module.css";
import { LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [userListings, setUserListings] = useState([]); // Kullanıcının anketlerinin listesini içeren bir durum
  const { currentUser } = useSelector((state) => state.user); // Redux ile oturum açmış kullanıcı bilgileri alınır

  // Kullanıcının anketlerini getirmek için kullanılan bir fonksiyon
  const handleShowListings = async () => {
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    setUserListings(data);
  };

  // Sayfa yüklendiğinde anketleri getirmek için kullanılan etki alanı fonksiyonu
  useEffect(() => {
    handleShowListings();
  }, []);

  // Kullanıcının sahip olduğu toplam anket sayısını hesaplar
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
