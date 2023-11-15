import styles from "./ListingCard.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// "ListingCard" adında bir fonksiyonel bileşen tanımlanır
function ListingCard({ data, onDeleteClick }) {
  const handleAnswerClick = () => {
    // Tam URL'yi panoya kopyala
    const fullURLToCopy = `${window.location.origin}/${data._id}`;
    navigator.clipboard
      .writeText(fullURLToCopy)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  return (
    <div className={styles.listingCard}>
      <div>
        <h2>{data.name}</h2>
        <p>{data.details}</p>
        <p className={styles.categoryStyle}>#{data.category}</p>
      </div>
      <div className={styles.listingBtns}>
        {/* Anketi güncelleme sayfasına yönlendiren bir Link oluşturulur */}
        <a href={`/update/${data._id}`}>
          <p>Edit</p>
        </a>
        {/* Anketi yanıtlama sayfasına yönlendiren bir Link oluşturulur */}
        <a href="#" onClick={handleAnswerClick}>
          <p>Copy Link</p>
        </a>
        <span onClick={() => onDeleteClick(data._id)}>Delete</span>
      </div>
    </div>
  );
}

export default ListingCard;
