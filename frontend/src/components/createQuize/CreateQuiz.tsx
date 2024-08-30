import { useState } from "react";
import Modal from "../modal/Modal";
import QuizTypeForm from "../form/quizTypeForm/QuizTypeForm";
import QuestionAnswerForm from "../form/questionAnswerForm/QuestionAnswerForm";
import { Options, Quiz, QuizName } from "../../Types/Quize";
import SuccessCreateQuiz from "../success/SuccessCreateQuiz";
import { CURRENT_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

type Props = {};

function CreateQuiz({}: Props) {
  const [show, setShow] = useState(true);
  const [quiz, setQuiz] = useState<QuizName>({
    quizName: "",
    typeOfQuiz: "none",
  }); // Ensures quiz can be null initially
  const [link, setLink] = useState<string>("");
  const navigate = useNavigate();
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
  const [success, setSuccess] = useState(false);

  function hide(str:string = "IN") {
    if(str=="OUT"){
      navigate("/analytics");
    }
    setShow(false);
  }

  function hideSuccessfulModal(str:string = "IN") {
    navigate("/analytics");
    setSuccess((_) => false);
  }

  function showSuccessfulModal() {
    setSuccess((_) => true);
  }

  function setQuizTypeName(data: QuizName) {
    setQuiz((prevQuiz) => {
      // Ensure prevQuiz is either updated with data or initialized
      return prevQuiz ? { ...prevQuiz, ...data } : ({ ...data } as Quiz);
    });
    setStep(false);
  }

  function setGeneratedLink(id: string) {
    setLink((_) => `${CURRENT_URL}/startQuiz/${id}`);
  }

  return (
    <div>
      <Modal onClose={hide} show={show}>
        {step && quiz?.typeOfQuiz == "none" ? (
          <QuizTypeForm onClose={hide} setNameType={setQuizTypeName} />
        ) : (
          quiz?.typeOfQuiz != undefined && (
            <QuestionAnswerForm
              id="id"
              state="CREATE"
              setGeneratedLink={setGeneratedLink}
              quizType={quiz?.typeOfQuiz}
              quizName={quiz.quizName}
              onClose={hide}
              showSuccessModal={showSuccessfulModal}
              questions={questions}
              setQuestions={setQuestions}
            />
          )
        )}
      </Modal>
      <Modal onClose={hideSuccessfulModal} show={success}>
        <SuccessCreateQuiz onClose={hideSuccessfulModal} link={link} />
      </Modal>
    </div>
  );
}

export default CreateQuiz;
