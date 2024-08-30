import { useEffect, useRef, useState } from "react";
import { Quiz } from "../../Types/Quize";
import classes from "./StartQuiz.module.css";
import OptionsGrid from "../optionsGrid/OptionsGrid";
import QuizCompleteBanner from "../quizComplete/QuizCompleteBanner";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";

function StartQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>({
    questions: [],
    quizName: "",
    typeOfQuiz: "none",
  });
  const timerId = useRef<number | null>(null);
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<
    { id: string; ans: number }[]
  >(new Array());

  const selectOptions = (index: number) => {
    if (
      quiz.questions.length &&
      quiz.questions[currentQuestionIndex]._id != undefined
    ) {
      setSelectedOptions((prev) => {
        const newOptions = [...prev];
        newOptions[currentQuestionIndex] = {
          ans: index,
          id:
            quiz.questions[currentQuestionIndex]._id != undefined
              ? quiz.questions[currentQuestionIndex]._id
              : "id",
        };
        return newOptions;
      });
    }
  };

  const nextQuestion = async () => {
    setLoading((_) => true);
    if (quiz.questions[currentQuestionIndex]._id)
      await incrementQuestionImpression(
        quiz.questions[currentQuestionIndex]._id
      );
    clearInterval(timerId.current!);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      await getResult();
      console.log("Quiz Complete. Submit the answers.");
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setLoading((_) => false);
  };

  async function incrementQuestionImpression(id: string) {
    let res = await axios.get(
      `${BASE_URL}/api/quiz/increaseQuestionImpression/${id}`
    );
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  }

  const fetchQuiz = async (id: string) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/quiz/startQuiz/${id}`);
      if (res.status === 200) {
        setQuiz(res.data);
        setSelectedOptions((_) =>
          res.data?.questions?.map((ele: { _id: string }) => ({
            ans: 10,
            id: ele._id,
          }))
        );
      } else {
        console.error("Failed to fetch the quiz");
      }
    } catch (error) {
      console.error("Error fetching the quiz:", error);
    }
  };

  async function getResult() {
    let res = await axios.post(`${BASE_URL}/api/quiz/getResult`, {
      answers: selectedOptions,
      typeOfQuiz: quiz.typeOfQuiz,
    });
    if (res.status == 200) {
      setScore(res.data.score);
    } else {
      console.log("not getting score");
    }
  }

  useEffect(() => {
    if (quiz.questions.length && quiz.questions[currentQuestionIndex]) {
      clearInterval(timerId.current!);

      const currentTimer = quiz.questions[currentQuestionIndex].timer;
      setTimer(currentTimer);

      if (currentTimer !== 0) {
        timerId.current = window.setInterval(() => {
          setTimer((prev) => {
            if (prev > 1) {
              return prev - 1;
            } else {
              nextQuestion();
              return 0;
            }
          });
        }, 1000);
      }
    }

    return () => clearInterval(timerId.current!);
  }, [currentQuestionIndex, quiz.questions]);

  useEffect(() => {
    if (params.quidId) {
      fetchQuiz(params.quidId);
    }
  }, [params.quidId]);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {currentQuestionIndex < quiz.questions.length ? (
          <>
            <header className={classes.headers}>
              <div>
                {currentQuestionIndex + 1}/{quiz.questions.length}
              </div>
              {quiz.typeOfQuiz !== "POLL" &&
                quiz.questions[currentQuestionIndex].timer !== 0 && (
                  <div className={classes.timer}>
                    00:{String(timer).padStart(2, "0")}s
                  </div>
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
              <button
                disabled={
                  !selectedOptions[currentQuestionIndex].ans &&
                  selectedOptions[currentQuestionIndex].ans != 0
                }
                className={classes.nextBtn}
                onClick={nextQuestion}
              >
                {!loading ? (currentQuestionIndex === quiz.questions.length - 1 ? "Complete": "Next") : <Spinner />}
              </button>
            </div>
          </>
        ) : (
          quiz.typeOfQuiz !== "none" && (
            <QuizCompleteBanner
              total={quiz.questions.length}
              type={quiz.typeOfQuiz}
              score={score} // Calculate the score based on selectedOptions
            />
          )
        )}
      </div>
    </div>
  );
}

export default StartQuiz;
