import { useState, useEffect } from "react";
import styles from "./Answer.module.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Add() {
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    details: "",
    answer: "",
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
        toast.success("Answer successfully received!", {
          position: "top-right",
        });
        navigate(`/all`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <h2>Answer the Survey</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Survey Name:</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            disabled
          ></input>
        </label>
        <label>
          <span>Survey Question Details:</span>
          <textarea
            required
            name="details"
            onChange={handleChange}
            value={formData.details}
            disabled
          ></textarea>
        </label>
        <label>
          <span>Answer the Survey</span>
          <textarea
            required
            name="answer"
            onChange={handleChange}
            value={formData.answer}
          ></textarea>
        </label>
        <button className={styles.btn}>
          {loading ? "Loading" : "Answer Survey"}
        </button>
        <p>{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
}
