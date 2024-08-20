import { useState } from "react";
import Modal from "../modal/Modal";
import QuizTypeForm from "../form/QuizTypeForm";
import QuestionAnswerForm from "../form/questionAnswerForm/QuestionAnswerForm";
import { Quiz, quizNameType } from "../../Types/Quize";

type Props = {};

function CreateQuiz({}: Props) {
  const [show, setShow] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null); // Ensures quiz can be null initially
  const [step, setStep] = useState(true);

  function hide() {
    console.log("Modal closed");
    setShow(false);
  }

  function setQuizTypeName(data: quizNameType) {
    setQuiz((prevQuiz) => {
      // Ensure prevQuiz is either updated with data or initialized
      return prevQuiz ? { ...prevQuiz, ...data } : { ...data } as Quiz;
    });
    setStep(false);
  }

  return (
    <div>
      <Modal onClose={hide} show={show}>
        {step && !quiz?.type ? (
          <QuizTypeForm onClose={hide} setNameType={setQuizTypeName} />
        ) : (
          quiz?.type!=undefined &&
          <QuestionAnswerForm quizType={quiz?.type} quizName={quiz.name} />
        )}
      </Modal>
    </div>
  );
}

export default CreateQuiz;
