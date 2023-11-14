const QuestionInput = ({ question, onChange, index }) => {
  return (
    <>
      <span>Questions:{index + 1}</span>
      <textarea
        key={index}
        required
        name="questions"
        onChange={(event) => onChange(event, index)}
        value={question.text}
      ></textarea>
    </>
  );
};

export default QuestionInput;