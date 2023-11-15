import styles from "../Answer.module.css";

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessInfo;
