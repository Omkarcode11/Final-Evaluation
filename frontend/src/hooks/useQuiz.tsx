import React, { useContext } from "react";
import { context } from "../components/context/MyContextApp";
import { question, Quiz } from "../Types/Quize";


function useQuiz() {
  const quizContext = useContext(context);

  // Ensure the context is not undefined
  if (!quizContext) {
    throw new Error("useQuiz must be used within a MyContextApp Provider");
  }

  const { quiz, setQuiz } = quizContext;

  function createQuiz(data: Quiz) {
    setQuiz(data);
  }

  function deleteQuestion(index: number) {
    if (quiz) {
      const newQuiz = { ...quiz };
      newQuiz.questions?.splice(index, 1);
      setQuiz(newQuiz);
    }
  }

  function addQuestion(data: question) {
    if (quiz) {
      setQuiz((prev) => {
        if (prev) {
          let newQuestion = { ...prev };
          newQuestion.questions?.push(data);
          return newQuestion;
        }
      });
    }
  }

  function updateQuestion(index:number,data:question){
      if(quiz && index<quiz.questions.length && data){
          setQuiz(prev=>{
              if(prev){
                let newQuestion = {...prev}
                newQuestion.questions[index] = data
                return newQuestion
            }
            return prev
          })
      }
  }

  return { createQuiz, deleteQuestion,addQuestion ,updateQuestion};
}

export default useQuiz;
