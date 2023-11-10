import { useState, useEffect } from "react";
import styles from "./Answer.module.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Answer() {
  // Redux kullanarak oturum açmış kullanıcı bilgilerini alır
  const { currentUser } = useSelector((state) => state.user);
  // React Router'ın "useParams" özelliği ile URL'den parametreleri alır
  const params = useParams();
  const navigate = useNavigate();

  // Form verileri için bir "formData" durumu tanımlanır
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    answer: "",
    category: "",
  });
  const [error, setError] = useState(false); // Hata durumu
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const listingId = params.id; // Anket kimliği, URL'den alınır

  // Formdaki veri değişikliklerini dinleyen bir fonksiyon
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Sayfa yüklendiğinde, belirli bir anketin verilerini getiren bir etki alanı fonksiyonu
  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, [listingId]);

  // Form gönderildiğinde çalışan bir fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(listingId, "listingId");
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data._id, "data");
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        // Başarılı bir şekilde yanıtlandığında başarılı bir bildirim görüntülenir
        toast.success("Answer successfully received!", {
          position: "top-right",
        });
        // Yanıtın gönderildikten sonra "all" sayfasına yönlendirilir
        navigate(`/all`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.formStyle}>
          <div className={styles.fullWidthElement} />
          <div className={styles.detailContainer}>
            <div className={styles.fullWidthElementLeft} />
            <div className={styles.formInfo}>
              <span>React.js Survey</span>
              <br />
              <span>A Survey About React.js and Librarys</span>
              <h2>Answer the Survey</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.mainFormContainer}>
          <div className={styles.labelGroup}>
            <label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                disabled
                className={styles.formInputStyle}
              ></input>
            </label>
            <label>
              <input
                required
                name="details"
                onChange={handleChange}
                value={formData.details}
                disabled
                className={styles.textareaStyle}
              ></input>
            </label>
            <label className={styles.answerDetailContainer}>
              <textarea
                required
                name="answer"
                onChange={handleChange}
                value={formData.answer}
              ></textarea>
            </label>{" "}
          </div>
          <button className={styles.btn}>
            {loading ? "Loading" : "Answer Survey"}
          </button>
          <p>{error && <p>{error}</p>}</p>
        </form>
      </div>
    </div>
  );
}
