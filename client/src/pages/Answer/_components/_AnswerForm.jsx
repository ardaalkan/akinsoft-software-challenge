import styles from "../Answer.module.css";
import FormHeader from "./_FormHeader";
import QuestionInput from "./_QuestionInput";
import SuccessInfo from "./_SuccessInfo";

const AnswerForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => (
  <div className={styles.container}>
    {formData.submitted ? (
      <SuccessInfo formData={formData} />
    ) : (
      <div className={styles.main}>
        <FormHeader formData={formData} handleChange={handleChange} />
        <form onSubmit={handleSubmit} className={styles.mainFormContainer}>
          {formData.questions.map((question, index) => (
            <QuestionInput
              key={index}
              index={index}
              text={question.text}
              onChange={handleChange}
            />
          ))}
          <button className={styles.btn}>
            {loading ? "Loading" : "Answer Survey"}
          </button>
          <p>{error && <p>{error}</p>}</p>
        </form>
      </div>
    )}
  </div>
);

export default AnswerForm;
