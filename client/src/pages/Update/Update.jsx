import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryOptions } from "../../../../api/utils/categorys";
import UpdateForm from "./_components/_UpdateForm";

export default function Update() {
  const { currentUser } = useSelector((state) => state.user); // Redux'tan kullanıcı bilgileri alınır
  const params = useParams(); // URL parametreleri alınır
  const navigate = useNavigate(); // Sayfa yönlendirme işlemleri için kullanılır

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    category: "",
    questions: [{ text: "", order: 1 }],
  });
  const [error, setError] = useState(false); // Hata mesajını saklar
  const [loading, setLoading] = useState(false); // Kaydetme işlemi sırasında yüklenme durumunu saklar
  const listingId = params.id; // URL'den gelen kayıt kimliği

  // Kayıt bilgileri değiştiğinde çalışan fonksiyon
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    if (name === "questions") {
      setFormData((prevFormData) => {
        const newQuestions = [...prevFormData.questions];
        // Belirli bir sorunun text özelliğini günceller
        newQuestions[index] = { ...newQuestions[index], text: value };
        return { ...prevFormData, questions: newQuestions };
      });
    } else {
      // Diğer alanlar için sadece değeri günceller
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Soruların düzenlenmiş hallerini oluşturur.
  const formattedQuestions = formData.questions.map((question, index) => ({
    text: question.text,
    order: index + 1,
  }));

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
          questions: formattedQuestions,
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
    <UpdateForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categoryOptions={categoryOptions}
      loading={loading}
      error={error}
    />
  );
}
