import { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Update.module.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"; // Toast eklemeyi unutmayın

export default function Add() {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const listingId = params.id;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(listingId, "listingId");
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
      console.log(data._id, "data");
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
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
