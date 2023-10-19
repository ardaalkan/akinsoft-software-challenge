import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListingCard from "../All/ListingCard/ListingCard";
import styles from "../All/All.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ADD_SURVEY_REMINDER = "You don't have any surveys. Please create.";

export default function All() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      console.log(data, "data");
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // Bu popüler toast package başarılı bir silme durumunda Toast bildirimi gösterecek.
      toast.success("Listing deleted successfully!");

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleShowListings(); // Sayfa yüklendiğinde listeleri getirir.
  }, []); // bağımlılık dizisi ve İngilizcede "dependency array" olarak geçer.

  console.log(userListings.length, "length!!!!");

  return (
    <div className={styles.listingContainer}>
      <h1 style={{ textAlign: "left", margin: "10px" }}>All Survey</h1>
      {showListingsError && <p>Hata oluştu.</p>}
      {userListings.length === 0 && (
        <p className={styles.reminder}>{ADD_SURVEY_REMINDER}</p>
      )}
      <div>
        {userListings.map((listing, index) => (
          <ListingCard
            key={index}
            data={listing}
            onDeleteClick={handleListingDelete}
          />
        ))}
      </div>
    </div>
  );
}
