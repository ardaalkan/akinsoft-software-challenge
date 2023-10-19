import styles from "./ListingCard.module.css";
import { Link } from "react-router-dom";

function ListingCard({ data, onDeleteClick }) {
  return (
    <div className={styles.listingCard}>
      <div>
        <h2>{data.name}</h2>
        <p>{data.details}</p>
        <p className={styles.categoryStyle}>#{data.category}</p>
      </div>
      <div className={styles.listingBtns}>
        <Link to={`/update/${data._id}`}>
          <p>Edit</p>
        </Link>

        <Link to={`/answer/${data._id}`}>
          <p>Answer</p>
        </Link>
        <span onClick={() => onDeleteClick(data._id)}>Delete</span>
      </div>
    </div>
  );
}

export default ListingCard;
