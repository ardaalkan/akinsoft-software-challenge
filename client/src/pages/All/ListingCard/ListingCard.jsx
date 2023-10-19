import styles from "./ListingCard.module.css";
import { Link } from "react-router-dom";

// "ListingCard" adında bir fonksiyonel bileşen tanımlanır
function ListingCard({ data, onDeleteClick }) {
  return (
    // Bileşenin dış sınıfı "styles.listingCard" ile stilendirilir
    <div className={styles.listingCard}>
      <div>
        <h2>{data.name}</h2>
        <p>{data.details}</p>
        <p className={styles.categoryStyle}>#{data.category}</p>
      </div>
      <div className={styles.listingBtns}>
        {/* Anketi güncelleme sayfasına yönlendiren bir Link oluşturulur */}
        <Link to={`/update/${data._id}`}>
          <p>Edit</p>
        </Link>

        {/* Anketi yanıtlama sayfasına yönlendiren bir Link oluşturulur */}
        <Link to={`/answer/${data._id}`}>
          <p>Answer</p>
        </Link>

        <span onClick={() => onDeleteClick(data._id)}>Delete</span>
      </div>
    </div>
  );
}

export default ListingCard;
