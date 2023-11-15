// ResponseCategory.js
import ResponseQuestion from "./_ResponseQuestions";
import styles from "../Response.module.css";

export default function ResponseCategory({ category }) {
  return (
    <div className={styles.questionCart}>
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <h2>{category.name}</h2>
          <p>{category.details}</p>
        </div>
        <ul>
          {category.questions.map((question, index) => (
            <ResponseQuestion key={question._id || index} question={question} />
          ))}
        </ul>
      </div>
    </div>
  );
}
