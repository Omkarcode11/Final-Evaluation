import { FormEvent, useRef, useState } from "react";
import classes from "./QuizTypeForm.module.css";
import { QuizName } from "../../../Types/Quize";

type Props = {
  onClose: () => void;
  setNameType: (data: QuizName) => void;
};

function QuizTypeForm({ onClose, setNameType }: Props) {
  let nameRef = useRef<HTMLInputElement>(null);
  let [select, setSelect] = useState<"POLL" | "QA" | "none">("none");

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameRef.current && nameRef.current.value != null && select != "none") {
      let data: QuizName = {
        quizName: nameRef.current?.value,
        typeOfQuiz: select,
      };
      setNameType(data);
    }
  }

  return (
    <form className={classes.formContainer} onSubmit={submitHandler}>
      <div className={""}>
        <input
          className={classes.quizNameInput}
          ref={nameRef}
          required
          type="text"
          placeholder="Quiz Name"
        />
      </div>
      <div className={classes.radioGroup}>
        <label>Quiz Type</label>
        <label
          className={
            select == "QA"
              ? `${classes.radioLabel} ${classes.active}`
              : `${classes.radioLabel}`
          }
        >
          Q&A
          <input
            className={classes.inputRadio}
            onClick={() => setSelect("QA")}
            required
            type="radio"
            name="quizType"
          />
        </label>
        <label
          className={
            select == "POLL"
              ? `${classes.radioLabel} ${classes.active}`
              : `${classes.radioLabel}`
          }
        >
          Poll Type
          <input
            className={classes.inputRadio}
            onClick={() => setSelect("POLL")}
            required
            type="radio"
            name="quizType"
          />
        </label>
      </div>
      <div className={classes.buttonContainer}>
        <button className={classes.btn} type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={`${classes.btn} ${classes.active}`}>Continue</button>
      </div>
    </form>
  );
}

export default QuizTypeForm;
