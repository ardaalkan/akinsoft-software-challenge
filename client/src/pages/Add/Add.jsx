import { useState } from "react";
import Select from "react-select";
import styles from "./Add.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Add() {
  const { currentUser } = useSelector((state) => state.user);

  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    category: "",
  });
  console.log(formData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
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
        // Form gönderildikten sonra inputları temizle
        setFormData({
          name: "",
          details: "",
          category: "",
        });
        toast.success("Anket başariyla eklendi!", {
          position: "top-right",
          autoClose: 3000, // 3 saniye sonra otomatik kapanır
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
        <button className={styles.btn}>
          {loading ? "Adding" : "Add Survey"}
        </button>
        <p>{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
}
