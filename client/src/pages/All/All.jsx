import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListingContainer from "./ListingContainer/ListingContainer";

export default function All() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      // console.log(data, "data");
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

  return (
    <ListingContainer
      showListingsError={showListingsError}
      userListings={userListings}
      onListingDelete={handleListingDelete}
    />
  );
}
