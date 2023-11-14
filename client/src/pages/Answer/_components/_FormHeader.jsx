import styles from "../Answer.module.css";

const SuccessInfo = ({ formData, handleChange }) => {
  return (
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
  );
};

export default SuccessInfo;
