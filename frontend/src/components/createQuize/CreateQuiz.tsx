import { useState } from "react";
import Modal from "../modal/Modal";
import QuizTypeForm from "../form/QuizTypeForm";
import QuestionAnswerForm from "../form/questionAnswerForm/QuestionAnswerForm";
import { Quiz, quizNameType } from "../../Types/Quize";
import SuccessCreateQuiz from "../success/SuccessCreateQuiz";

type Props = {};

function CreateQuiz({}: Props) {
  const [show, setShow] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null); // Ensures quiz can be null initially
  const [step, setStep] = useState(true);
  const [success,setSuccess] = useState(false)

  function hide() {
    setShow(false);
  }

  function hideSuccessfulModal(){
    console.log('is it working?')
    setSuccess(_=>false)
  }

  function showSuccessfulModal(){
   setSuccess(_=>true)
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
          <QuestionAnswerForm quizType={quiz?.type} quizName={quiz.name} onClose={hide} />
        )}
      </Modal>
      <Modal onClose={hideSuccessfulModal} show={success}>
        <SuccessCreateQuiz onClose={hideSuccessfulModal}/>
      </Modal>
    </div>
  );
}

export default CreateQuiz;
