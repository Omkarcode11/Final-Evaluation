import React, { Dispatch, FormEvent, useState } from "react";
import styles from "./questionAnswerForm.module.css";
import QuestionList from "../questionList/QuestionList";
import QuestionTypeSelector from "../questionTypeSelector/QuestionTypeSelector";
import OptionsContainer from "../questionContainer/OptionsContainer";
import TimerSelector from "../timerSelector/TimerSelector";
import ButtonGroup from "../buttonGroup/ButtonGroup";
import useApiClient from "../../../hooks/useApiClient";
import { Quiz } from "../../../Types/Quize";

type Prop = {
  quizType: "QA" | "POLL" | "none";
  quizName: string;
  onClose: () => void;
  showSuccessModal: () => void;
  questions: Options[];
  setQuestions: Dispatch<React.SetStateAction<Options[]>>;
  state: "UPDATE" | "CREATE";
};

interface Options {
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  question: string;
  options: Option[];
  answer: number;
  timer: 0 | 5 | 10;
}

interface Option {
  text: string;
  ImageUrl: string;
}

const QuestionAnswerForm = ({
  showSuccessModal,
  quizType,
  quizName,
  onClose,
  questions,
  setQuestions,
  state,
}: Prop) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { createQuiz } = useApiClient();

  function setIndex(i: number) {
    setSelectedIndex((_) => i);
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data: Quiz = {
      quizName: quizName,
      typeOfQuiz: quizType,
      questions: questions,
    };
    if (state == "CREATE") {
      await createQuiz(data);
    } else {
      // await updateQuiz(data)
    }
    onClose();
    showSuccessModal();
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
        timer: 0,
      },
    ]);
    setSelectedIndex((_) => questions.length);
  }

  function setTimer(timer: 0 | 5 | 10) {
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
    if (state == "CREATE") {
      setQuestions((prev) => {
        let allQuestions = [...prev];
        allQuestions[selectedIndex].answer = i;
        return allQuestions;
      });
    }
  }

  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <QuestionList
        state={state}
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

      {state != "UPDATE" && (
        <QuestionTypeSelector
          selectedOptionType={questions[selectedIndex]?.optionType}
          setOptionType={setOptionType}
        />
      )}
      <div className={styles.optionsContainer}>
        <OptionsContainer
          state={state}
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
      <ButtonGroup state={state} onClose={onClose} />
    </form>
  );
};

export default QuestionAnswerForm;
