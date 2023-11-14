import styles from "../Answer.module.css";

const QuestionInput = ({ index, text, onChange }) => (
  <div className={styles.labelGroup}>
    <label>
      <input
        required
        name={`question-${index}`}
        onChange={onChange}
        value={text}
        disabled
        className={styles.textareaStyle}
      />
    </label>
    <label className={styles.answerDetailContainer}>
      <textarea required name={`answer-${index}`} onChange={onChange}></textarea>
    </label>{" "}
  </div>
);

export default QuestionInput;