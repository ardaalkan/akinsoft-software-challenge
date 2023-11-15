import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Response.module.css";
import "react-toastify/dist/ReactToastify.css";
import ResponseList from "../Response/_components/_ResponseList";

export default function Response() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  useEffect(() => {
    handleShowListings();
  }, []);

  return (
    <div className={styles.main}>
      <h1>Replies</h1>
      {showListingsError && <p>Error.</p>}
      <ResponseList userListings={userListings} />
    </div>
  );
}
