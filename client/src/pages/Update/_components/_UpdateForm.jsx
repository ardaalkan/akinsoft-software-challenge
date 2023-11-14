import InputField from "../_components/_InputField";
import SelectField from "../_components/_SelectCategory";
import QuestionInput from "../_components/_QuestionInput";
import styles from "../Update.module.css";
const UpdateForm = ({
  formData,
  handleChange,
  handleSubmit,
  categoryOptions,
  loading,
  error,
}) => {
  return (
    <div className={styles.main}>
      <h2>Update Survey</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Survey Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          label="Survey Details"
          type="textarea"
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
        />
        <SelectField
          label="Survey Category"
          options={categoryOptions}
          onChange={(selectedOption) =>
            handleChange({
              target: {
                name: "category",
                value: selectedOption.value,
              },
            })
          }
          value={categoryOptions.find(
            (option) => option.value === formData.category
          )}
          noOptionsMessage="ekle"
        />
        <label>
          {formData.questions.map((question, index) => (
            <QuestionInput
              key={index}
              question={question}
              onChange={handleChange}
              index={index}
            />
          ))}
        </label>
        <button className={styles.btn}>
          {loading ? "Adding" : "Update Survey"}
        </button>
        <p>{error && <p>{error}</p>}</p>
      </form>
    </div>
  );
};

export default UpdateForm;
