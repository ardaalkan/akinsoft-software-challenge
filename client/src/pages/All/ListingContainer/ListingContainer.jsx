import styles from "../All.module.css";
import ListingList from "../ListingList/ListingList";

const ADD_SURVEY_REMINDER = "You don't have any surveys. Please create.";

const ListingContainer = ({ showListingsError, userListings, onListingDelete }) => (
    <div className={styles.listingContainer}>
      <h1 style={{ textAlign: "left", margin: "10px" }}>All Survey</h1>
      {showListingsError && <p>Hata oluştu.</p>}
      {userListings.length === 0 && (
        <p className={styles.reminder}>{ADD_SURVEY_REMINDER}</p>
      )}
      <ListingList userListings={userListings} onListingDelete={onListingDelete} />
    </div>
  );
  
  export default ListingContainer;