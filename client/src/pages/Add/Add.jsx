import { useState } from "react";
import Select from "react-select";
import styles from "./Add.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  // Redux'tan "currentUser" bilgisini al
  const { currentUser } = useSelector((state) => state.user);

  // Kategori seçenekleri
  const categoryOptions = [
    { value: "Software", label: "Software" },
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "DevOps", label: "DevOps" },
  ];

  // Form verilerini saklayacak state
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    category: "",
    questions: [""],
  });

  // Hata ve yükleme durumu
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Input değişikliklerini ele alacak fonksiyon
  const handleChange = (event, index) => {
    const { name, value } = event.target;

    // Eğer bir index belirtilmişse, yani hangi sorunun değiştiğini biliyorsak
    if (index !== undefined) {
      const newQuestions = [...formData.questions];
      newQuestions[index] = value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        questions: newQuestions,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    console.log("Name:", name);
    console.log("Value:", value);
  };

  // Soru eklemeyi sağlayacak fonksiyon
  const addQuestion = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [...prevFormData.questions, ""],
    }));
    console.log(formData); // Check the state after adding a question
  };

  // Form gönderildiğinde yapılacak işlemler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      // Convert 'questions' array to the desired format
      const formattedQuestions = formData.questions.map((text, index) => ({
        text,
        order: index + 1,
      }));

      const res = await fetch("/api/listing/create", {
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
        // Form gönderildikten sonra inputları temizlemek için model ifadeleri
        // tekrar ilk halindeki gibi boş string olarak tanımlanır.
        setFormData({
          name: "",
          details: "",
          category: "",
          questions: [""], // Soruları sıfırla
        });

        // Başarılı bir şekilde eklendiğine dair bir bildirim gösterilir.
        toast.success("Your survey added successfully", {
          position: "top-right",
          autoClose: 3000, // 3 saniye sonra otomatik kapanır.
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Create New Survey</h2>
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
          />
        </label>
        {formData.questions.map((question, index) => (
          <div key={index}>
            <label>
              <span>Question {index + 1}:</span>
              <textarea
                required
                name={`question${index + 1}`}
                onChange={(e) => handleChange(e, index)}
                value={question}
              ></textarea>
            </label>
          </div>
        ))}
        <button type="button" onClick={addQuestion} className={styles.btn}>
          Add New Question
        </button>
        <button type="submit" className={styles.btn}>
          {loading ? "Adding" : "Add Survey"}
        </button>
        <p>{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
}
