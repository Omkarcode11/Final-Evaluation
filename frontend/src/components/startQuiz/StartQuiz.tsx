import { useEffect, useRef, useState } from "react";
import { Quiz } from "../../Types/Quize";
import classes from "./StartQuiz.module.css";
import OptionsGrid from "../optionsGrid/OptionsGrid";
import QuizCompleteBanner from "../quizComplete/QuizCompleteBanner";

function StartQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const timerId = useRef<number | null>(null);
  const [selectedOptions,setSelectedOptions] = useState(new Array(4).fill(-1))
  const quiz: Quiz = {
    quizName: "omkar",
    typeOfQuiz: "POLL",
    questions: [
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 0,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 5,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is React? How does it look like?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a library.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a framework.",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "React is a language.",
          },
          { ImageUrl: "https://picsum.photos/seed/picsum/200/300", text: "" },
        ],
      },
      // ... Other questions
    ],
  };

  function selectOptions(index:number){
      setSelectedOptions(prev=>{
        let newOptions = [...prev]
        newOptions[currentQuestionIndex] = index
        return newOptions
      })
  }

  const nextQuestion = () => {
    clearInterval(timerId.current!);
    if (currentQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("Quiz Complete. Submit the answers.");
    }
  };

  useEffect(() => {
    if (quiz.questions[currentQuestionIndex]) {
      setTimer(quiz.questions[currentQuestionIndex].timer);
      if (quiz.questions[currentQuestionIndex].timer != 0) {
        timerId.current = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
    }

    return () => clearInterval(timerId.current!);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (quiz.questions[currentQuestionIndex].timer != 0 && timer <= 0) {
      nextQuestion();
    }
  }, [timer]);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {currentQuestionIndex < quiz.questions.length ? (
          <>
            <header className={classes.headers}>
              <div>
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </div>
              {quiz.typeOfQuiz!='POLL' && quiz.questions[currentQuestionIndex].timer != 0 ? (
                <div className={classes.timer}>
                  00:{String(timer).padStart(2, "0")}s
                </div>
              ) : (
                <div></div>
              )}
            </header>
            <div className={classes.question}>
              {quiz.questions[currentQuestionIndex].question}
            </div>
            <div className={classes.options}>
              <OptionsGrid
              selectOptions={selectOptions}
                content={quiz.questions[currentQuestionIndex].options}
              />
            </div>
            <div className={classes.btnGroup}>
              <button disabled={selectedOptions[currentQuestionIndex]==-1} className={classes.nextBtn} onClick={nextQuestion}>
                {currentQuestionIndex === quiz.questions.length - 1
                  ? "Complete"
                  : "Next"}
              </button>
            </div>
          </>
        ) : (
          quiz.typeOfQuiz != "none" && (
            <QuizCompleteBanner
              total={quiz.questions.length}
              type={quiz.typeOfQuiz}
              score={1}
            />
          )
        )}
      </div>
    </div>
  );
}

export default StartQuiz;
