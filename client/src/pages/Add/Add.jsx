import { useState } from "react";
import Select from "react-select";
import styles from "./Add.module.css";

export default function Add() {
  const [name, setName] = useState("");

  return (
    <div className={styles.main}>
      <h2>Create New Survey</h2>
      <form>
        <label>
          <span>Survey Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </label>
        <label>
          <span>Survey Details:</span>
          <textarea></textarea>
        </label>

        <label>
          <span>Due Date:</span>
          <input type="date" />
        </label>
        <label>
          <span>Project Category:</span>
          <Select />
        </label>
        <label>
          <span>Assign to:</span>
          <Select />
        </label>
        <button className={styles.btn}>Add Survey</button>
      </form>
    </div>
  );
}
