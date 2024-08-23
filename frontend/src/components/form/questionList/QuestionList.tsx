import { Options } from "../../../Types/Quize";
import styles from "../questionAnswerForm/QuestionAnswerForm.module.css";
import add from "./../../../assets/add.svg";
import close from "./../../../assets/close.svg";
import { FormEvent } from "react";

type Props = {
  questions: Options[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  saveAndAddQuestionHandler: (e: FormEvent) => void;
  deleteQuestion: (index: number) => void;
  state: "UPDATE" | 'CREATE'
};

const QuestionList = ({
  questions,
  selectedIndex,
  setSelectedIndex,
  saveAndAddQuestionHandler,
  deleteQuestion,
  state
}: Props) => (
  <div className={styles.allQuestions}>
    <div className={styles.pileContainer}>
      {questions.map((_, i) => (
        <span
          onClick={() => setSelectedIndex(i)}
          className={
            selectedIndex === i
              ? `${styles.border} ${styles.questionNum}`
              : `${i !== 0 && styles.questionNum}`
          }
        >
          {i !== 0 && state=='CREATE' && (
            <img
              src={close}
              onClick={() => deleteQuestion(i)}
              className={styles.close}
            />
          )}
          {i + 1}
        </span>
      ))}
      {questions.length < 5 && state=='CREATE' && (
        <button
          type="button"
          onClick={saveAndAddQuestionHandler}
          className={styles.addQuiz}
        >
          <img src={add} />
        </button>
      )}
    </div>
    <h3>Max 5 Questions</h3>
  </div>
);

export default QuestionList;
