import { Link } from "react-router-dom";
import styles from "../Answer.module.css"; // Adjust the path accordingly

const SuccessInfo = ({ formData }) => {
  return (
    <div className={styles.main}>
      <div className={styles.formStyleSuccess}>
        <div className={styles.fullWidthElement} />
        <div className={styles.detailContainer}>
          <div className={styles.fullWidthElementLeft} />
          <div className={styles.formInfo}>
            <span type="text" name="name">
              {formData.name}
            </span>
            <br />
            <span className={styles.responseText}>
              Thank you for your response
            </span>
            <Link to="#">
              <h2>Post another reply.</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessInfo;
