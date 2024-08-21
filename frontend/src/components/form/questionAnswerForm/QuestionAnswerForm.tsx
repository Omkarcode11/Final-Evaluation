import { FormEvent, useState } from "react";
import styles from "./questionAnswerForm.module.css";
import QuestionList from "../questionList/QuestionList";
import QuestionTypeSelector from "../questionTypeSelector/QuestionTypeSelector";
import OptionsContainer from "../questionContainer/OptionsContainer";
import TimerSelector from "../timerSelector/TimerSelector";
import ButtonGroup from "../buttonGroup/ButtonGroup";


type Prop = {
  quizType: "QA" | "POLL";
  quizName: string;
  onClose: () => void;
};

interface Options {
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  question: string;
  options: Option[];
  answer: number;
  timer: "OFF" | 5 | 10;
}

interface Option {
  text: string;
  ImageUrl: string;
}

const QuestionAnswerForm = ({ quizType, quizName, onClose }: Prop) => {
  const [questions, setQuestions] = useState<Options[]>([
    {
      question: "",
      optionType: "Text",
      options: [{ ImageUrl: "", text: "" }],
      answer: 0,
      timer: "OFF",
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function setIndex(i:number){
    setSelectedIndex(_=>i)
  }

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data = {
      quizName:quizName,
      typeOfQuiz:quizType,
      questions:questions
    }
    console.log(data);
  }

  function saveAndAddQuestionHandler(e: FormEvent) {
    e.preventDefault();
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        optionType: questions[selectedIndex].optionType,
        options: [],
        answer: 0,
        timer: "OFF",
      },
    ]);
    setSelectedIndex((_) => questions.length);
  }

  function setTimer(timer: "OFF" | 5 | 10) {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[selectedIndex].timer = timer;
      return newQuestions;
    });
  }

  function setOptionType(str: "Text" | "ImageUrl" | "TextImageUrl") {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[selectedIndex].optionType = str;
      return newQuestions;
    });
  }

  function deleteQuestion(index: number) {
    setQuestions((prev) => {
      if (index < 0 || index >= prev.length) {
        console.error("Index out of bounds");
        return prev; // Return the previous state if the index is invalid
      }
      let newQuestions = [...prev];
      newQuestions.splice(index, 1); // Remove the question at the specified index
      return newQuestions;
    });
  }

  function selectCorrectOption(i: number) {
    setQuestions((prev) => {
      let allQuestions = [...prev];
      allQuestions[selectedIndex].answer = i;
      return allQuestions;
    });
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <QuestionList
        questions={questions}
        selectedIndex={selectedIndex}
        setSelectedIndex={setIndex}
        saveAndAddQuestionHandler={saveAndAddQuestionHandler}
        deleteQuestion={deleteQuestion}
      />
      <input
        required
        type="text"
        className={styles.pollInput}
        placeholder="Poll Question"
        value={questions[selectedIndex]?.question}
        onChange={(e) =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].question = e.target.value;
            return newQuestions;
          })
        }
      />

      <QuestionTypeSelector
        selectedOptionType={questions[selectedIndex]?.optionType}
        setOptionType={setOptionType}
      />
      <div className={styles.optionsContainer}>

      <OptionsContainer
        quizType={quizType}
        options={questions[selectedIndex]?.options}
        optionType={questions[selectedIndex]?.optionType}
        correctAnswer={questions[selectedIndex]?.answer}
        addOption={() =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].options.push({
              ImageUrl: "",
              text: "",
            });
            return newQuestions;
          })
        }
        deleteOption={(i: number) =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].options.splice(i, 1);
            return newQuestions;
          })
        }
        appendText={(e: any, i: number) =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].options[i].text = e.target.value;
            return newQuestions;
          })
        }
        appendImageUrl={(e: any, i: number) =>
          setQuestions((prev) => {
            let newQuestions = [...prev];
            newQuestions[selectedIndex].options[i].ImageUrl = e.target.value;
            return newQuestions;
          })
        }
        selectCorrectOption={selectCorrectOption}
        />
      {quizType === "QA" && (
        <TimerSelector
          selectedTimer={questions[selectedIndex]?.timer}
          setTimer={setTimer}
        />
      )}
        </div>
      <ButtonGroup onClose={onClose} />
    </form>
  );
};

export default QuestionAnswerForm;
