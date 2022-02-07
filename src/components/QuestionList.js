import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions,setQuestions] = useState([]);
  const [isLoaded,setIsloaded] = useState(false)
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((response)=>response.json())
    .then((data) => {
      setQuestions(data)
      setIsloaded(true)
    });
  },[]);

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        const questionsToDisplay = questions.filter((q) => q.id !== id);
        setQuestions(questionsToDisplay);
      });
  }
  function handleEditQuestion(id,correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((editedQuestion) => {
        console.log(editedQuestion)
        const questionsToDisplay = questions.map((question) => {
          if (question.id === editedQuestion.id) return editedQuestion;
          return question;
        });
        setQuestions(questionsToDisplay);
      });
  }
  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question} 
      deleteQuestion={deleteQuestion}
      editQuestion={handleEditQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{isLoaded === true ? questionItems : "Yükleniyor"}</ul>
    </section>
  );
}


//  export function QuestionItemRender({ questions }) {
   
//    const array = questions[0]
//    console.log(array)
//    return(<div>
//      {
//        array.map((question)=> {
//          <h1>{question.id}</h1>
//        })
//      }
//    </div>)
//    return (
//      questions.map((question) => {
//        <QuestionItem question={question} />

//            })
//    );
//  }
 export default QuestionList;
