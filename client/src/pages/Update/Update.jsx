import { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Update.module.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Update() {
  const { currentUser } = useSelector((state) => state.user); // Redux'tan kullanıcı bilgileri alınır
  const params = useParams(); // URL parametreleri alınır
  const navigate = useNavigate(); // Sayfa yönlendirme işlemleri için kullanılır
  const categoryOptions = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "DevOps", label: "DevOps" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    category: "",
  }); // Kayıt bilgilerini saklayan bir durum
  const [error, setError] = useState(false); // Hata mesajını saklar
  const [loading, setLoading] = useState(false); // Kaydetme işlemi sırasında yüklenme durumunu saklar
  const listingId = params.id; // URL'den gelen kayıt kimliği

  // Kayıt bilgileri değiştiğinde çalışan fonksiyon
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Sayfa yüklendiğinde, belirtilen kayıt bilgilerini getirir
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

  // Kayıt güncelleme formu gönderildiğinde çalışan fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${listingId}`, {
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
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        // Başarılı bir şekilde güncellendiğinde bildirim gösterilir ve kullanıcı yönlendirilir
        toast.success("Successfully updated!", { position: "top-right" });
        navigate(`/all`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Update Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Survey Name:</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          ></input>
        </label>
        <label>
          <span>Survey Details:</span>
          <textarea
            required
            name="details"
            onChange={handleChange}
            value={formData.details}
          ></textarea>
        </label>
        <label>
          <span>Survey Category:</span>
          <Select
            required
            name="category"
            options={categoryOptions}
            onChange={(selectedOption) =>
              setFormData({ ...formData, category: selectedOption.value })
            }
            value={categoryOptions.find(
              (option) => option.value === formData.category
            )}
            noOptionsMessage="ekle"
          />
        </label>
        <button className={styles.btn}>
          {loading ? "Adding" : "Update Survey"}
        </button>
        <p>{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
}
