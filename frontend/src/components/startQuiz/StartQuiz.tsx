import { useState } from "react";
import { Quiz } from "../../Types/Quize";
import classes from "./StartQuiz.module.css";
import OptionsGrid from "../optionsGrid/OptionsGrid";
import QuizCompleteBanner from "../quizComplete/QuizCompleteBanner";

function StartQuiz() {
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let quiz: Quiz = {
    quizName: "omkar",
    typeOfQuiz: "QA",
    questions: [
      {
        optionType: "TextImageUrl",
        question: "What is react how it look like ?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksdf;lkjsf;lskjfs;ldfsdl;jk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksad;lfkjsd;flkjsad",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "o;lkj;lkjjkk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "",
          },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is react how it look like ?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksdf;lkjsf;lskjfs;ldfsdl;jk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksad;lfkjsd;flkjsad",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "o;lkj;lkjjkk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "",
          },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is react how it look like ?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksdf;lkjsf;lskjfs;ldfsdl;jk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksad;lfkjsd;flkjsad",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "o;lkj;lkjjkk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "",
          },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is react how it look like ?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksdf;lkjsf;lskjfs;ldfsdl;jk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksad;lfkjsd;flkjsad",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "o;lkj;lkjjkk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "",
          },
        ],
      },
      {
        optionType: "TextImageUrl",
        question: "What is react how it look like ?",
        timer: 10,
        answer: 0,
        options: [
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksdf;lkjsf;lskjfs;ldfsdl;jk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "oksad;lfkjsd;flkjsad",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "o;lkj;lkjjkk",
          },
          {
            ImageUrl: "https://picsum.photos/seed/picsum/200/300",
            text: "",
          },
        ],
      },
    ],
  };

  function nextQuestion() {
    if(currentQuestionIndex!=quiz.questions.length)
    setCurrentQuestionIndex((prev) => prev + 1);
    else console.log("submit")
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {currentQuestionIndex != quiz.questions.length ? (
          <>
            <header className={classes.headers}>
              <div>
                {currentQuestionIndex+1}/{quiz.questions.length}
              </div>
              <div className={classes.timer}>
                00:{quiz.questions[currentQuestionIndex].timer}s
              </div>
            </header>
            <div className={classes.question}>
              {quiz.questions[currentQuestionIndex].question}
            </div>
            <div className={classes.options}>
              <OptionsGrid
                content={quiz.questions[currentQuestionIndex].options}
              />
            </div>
            <div className={classes.btnGroup}>
              <button className={classes.nextBtn} onClick={nextQuestion}>{quiz.questions.length-1==currentQuestionIndex?"Complete":"Next"}</button>
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

// type OptionFn = {
//   text:string,
//   imageUrl:string,
// }

// function Option({text,imageUrl}:OptionFn) {
//   return (
//     <div className={classes.optionsInnerContainer}>
//       {text && <div>{text}</div>}
//       {imageUrl && (
//         <div>
//           <img src={imageUrl} />
//         </div>
//       )}
//     </div>
//   );
// }

export default StartQuiz;
