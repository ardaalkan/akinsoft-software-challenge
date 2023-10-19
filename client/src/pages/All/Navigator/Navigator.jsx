import { Link } from "react-router-dom";
import styles from "./AddSurveyMessage.module.css";

function AddSurveyMessage() {
  return (
    <div className={styles.messageContainer}>
      <p>Please Add Survey</p>
      <Link to="/add" className={styles.linkStyle}>Go to Add Survey</Link>
    </div>
  );
}

export default AddSurveyMessage;
