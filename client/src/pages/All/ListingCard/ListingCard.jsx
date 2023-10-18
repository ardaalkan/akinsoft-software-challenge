import styles from "./ListingCard.module.css";
import { Link } from "react-router-dom";

function ListingCard({ data, onDeleteClick }) {
  return (
    <div className={styles.listingCard}>
      <div>
        <h2>{data.name}</h2>
        <p>{data.details}</p>
      </div>
      <div className={styles.listingBtns}>
        <Link to={`/update/${data._id}`}>
          <span className={styles.listingEdit}>Edit</span>
        </Link>
        <span
          className={styles.listingDelete}
          onClick={() => onDeleteClick(data._id)}
        >
          Delete
        </span>
      </div>
    </div>
  );
}

export default ListingCard;
