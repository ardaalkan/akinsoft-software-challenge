import styles from "../Response.module.css";

export default function ResponseQuestion({ question }) {
  return (
    <li>
      <p className={styles.question}>{question.text}</p>
      {question.answers.length === 0 ? (
        <span className={styles.noAnswer}>Answers do not exist!</span>
      ) : (
        <ul>
          {question.answers.map((answer, answerIndex) => (
            <li key={answer._id || answerIndex} className={styles.answers}>
              <p className={styles.answer}>{answer}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}