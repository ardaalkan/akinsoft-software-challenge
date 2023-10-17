import styles from "./ListingCard.module.css"; // CSS modülünü içe aktarın

function ListingCard({ data, onDeleteClick }) {
  return (
    <div className={styles.listingCard}>
      <div>
        <h2>{data.name}</h2>
        <p>{data.details}</p>
      </div>
      <div className={styles.listingBtns}>
        <span className={styles.listingEdit}>Edit</span>
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
