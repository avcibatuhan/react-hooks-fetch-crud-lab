import React from "react";

function QuestionItem({ question,deleteQuestion,editQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  const onHandleDeleteQuestion = () => {
    deleteQuestion(id)
  }
  const onHandleChangeSelect = (e) => {
    editQuestion(id,e.target.value)
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={onHandleChangeSelect} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={onHandleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
