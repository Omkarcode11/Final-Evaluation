import { useState } from "react";
import Modal from "../modal/Modal";
import QuizTypeForm from "../form/quizTypeForm/QuizTypeForm";
import QuestionAnswerForm from "../form/questionAnswerForm/QuestionAnswerForm";
import { Options, Quiz, QuizName, quizNameType } from "../../Types/Quize";
import SuccessCreateQuiz from "../success/SuccessCreateQuiz";

type Props = {};

function CreateQuiz({}: Props) {
  const [show, setShow] = useState(true);
  const [quiz, setQuiz] = useState<QuizName>({quizName:"",typeOfQuiz:"none"}); // Ensures quiz can be null initially
  const [questions, setQuestions] = useState<Options[]>([
    {
      question: "",
      optionType: "Text",
      options: [{ ImageUrl: "", text: "" }],
      answer: 0,
      timer: 0,
    },
  ]);
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

  function setQuizTypeName(data: QuizName) {
    setQuiz((prevQuiz) => {
      // Ensure prevQuiz is either updated with data or initialized
      return prevQuiz ? { ...prevQuiz, ...data } : { ...data } as Quiz;
    });
    setStep(false);
  }

  return (
    <div>
      <Modal onClose={hide} show={show}>
        {step && quiz?.typeOfQuiz=='none' ? (
          <QuizTypeForm onClose={hide} setNameType={setQuizTypeName} />
        ) : (
          quiz?.typeOfQuiz!=undefined &&
          <QuestionAnswerForm state="CREATE" quizType={quiz?.typeOfQuiz} quizName={quiz.quizName} onClose={hide} showSuccessModal={showSuccessfulModal} questions={questions} setQuestions={setQuestions}/>
        )}
      </Modal>
      <Modal onClose={hideSuccessfulModal} show={success}>
        <SuccessCreateQuiz onClose={hideSuccessfulModal}/>
      </Modal>
    </div>
  );
}

export default CreateQuiz;
