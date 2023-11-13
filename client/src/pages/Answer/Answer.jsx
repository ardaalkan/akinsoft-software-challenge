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
    category: "",
    questions: [{ text: "" }],
    answers: [""],
  });

  const [error, setError] = useState(false); // Hata durumu
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const listingId = params.id; // Anket kimliği, URL'den alınır

  // Formdaki veri değişikliklerini dinleyen bir fonksiyon
  const handleChange = (event) => {
    if (event.persist) {
      event.persist();
    }

    const { name, value } = event.target;

    // Soru veya cevapla ilgili bir değişiklik olduğunu kontrol et
    if (name.startsWith("question")) {
      // Eğer değişiklik soruyla ilgiliyse
      const questionIndex = parseInt(name.split("-")[1], 10); // Soru indeksi
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: prevFormData.questions.map((q, i) =>
          i === questionIndex ? { ...q, text: value, answers: [] } : q
        ),
      }));
    } else if (name.startsWith("answer")) {
      // Eğer değişiklik cevapla ilgiliyse
      const answerIndex = parseInt(name.split("-")[1], 10); // Cevap indeksi
      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: prevFormData.questions.map((q, i) =>
          i === answerIndex
            ? { ...q, answers: [value] } // Cevapları sıfırlayıp yeni cevabı ekleyin
            : q
        ),
      }));
    } else {
      // Diğer durumlar için
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Sayfa yüklendiğinde, belirli bir anketin verilerini getiren bir etki alanı fonksiyonu
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        console.log(data, res.status);
        if (data.success === false) {
          return;
        }
        setFormData(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [listingId]);

  console.log("formData:", formData);

  // Form gönderildiğinde çalışan bir fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(listingId, "listingId");
    try {
      setLoading(true);
      setError(false);
      const body = currentUser
        ? { ...formData, userRef: currentUser._id }
        : { ...formData };
      const res = await fetch(`/api/listing/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
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
              <span type="text" name="name">
                {formData.name}
              </span>
              <br />
              <span name="details" onChange={handleChange}>
                {formData.details}
              </span>
              <h2>Answer the Survey</h2>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.mainFormContainer}>
          {formData.questions.map((question, index) => (
            <div key={index} className={styles.labelGroup}>
              <label>
                <input
                  required
                  name={`question-${index}`}
                  onChange={handleChange}
                  value={question.text} // 'text' özelliğini kullan
                  disabled
                  className={styles.textareaStyle}
                />
              </label>
              <label className={styles.answerDetailContainer}>
                <textarea
                  required
                  name={`answer-${index}`}
                  onChange={handleChange}
                ></textarea>
              </label>{" "}
            </div>
          ))}
          <button className={styles.btn}>
            {loading ? "Loading" : "Answer Survey"}
          </button>
          <p>{error && <p>{error}</p>}</p>
        </form>
      </div>
    </div>
  );
}

{
  /* <form onSubmit={handleSubmit} className={styles.mainFormContainer}>
<div className={styles.labelGroup}>
  <label>
    <input
      required
      name="questions"
      onChange={handleChange}
      value={formData.questions}
      disabled
      className={styles.textareaStyle}
    ></input>
  </label>
  <label className={styles.answerDetailContainer}>
    <textarea
      required
      name="answer"
      onChange={handleChange}
    ></textarea>
  </label>{" "}
</div>
<button className={styles.btn}>
  {loading ? "Loading" : "Answer Survey"}
</button>
<p>{error && <p>{error}</p>}</p>
</form> */
}
