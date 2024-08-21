import styles from "../questionAnswerForm/QuestionAnswerForm.module.css";
import del from "./../../../assets/deleteIcon.svg";
import { Option } from "../../../Types/Quize";

type Props = {
  quizType: "QA" | "POLL";
  options: Option[];
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  correctAnswer: number;
  addOption: () => void;
  deleteOption: (i: number) => void;
  appendText: (e: any, i: number) => void;
  appendImageUrl: (e: any, i: number) => void;
  selectCorrectOption: (i: number) => void;
};

const OptionsContainer = ({
  quizType,
  options,
  optionType,
  correctAnswer,
  addOption,
  deleteOption,
  appendText,
  appendImageUrl,
  selectCorrectOption,
}: Props) => (
  <div className={styles.optionsContainer}>
    <div className={styles.options}>
      {options.map((ele, i) => (
        <div className={styles.option}>
          {quizType === "QA" && (
            <input
              required
              onChange={() => selectCorrectOption(i)}
              type="radio"
              checked={correctAnswer === i}
              name="option"
            />
          )}
          {optionType.includes("Text") && (
            <input
              required
              type="text"
              className={
                quizType === "QA" && correctAnswer === i
                  ? `${styles.correctAnswer} ${styles.optionInput}`
                  : `${styles.optionInput}`
              }
              placeholder="Text"
              value={ele.text}
              onChange={(e: any) => appendText(e, i)}
            />
          )}
          {optionType.includes("ImageUrl") && (
            <input
              required
              type="url"
              className={
                quizType === "QA" && correctAnswer === i
                  ? `${styles.correctAnswer} ${styles.optionInput}`
                  : `${styles.optionInput}`
              }
              placeholder="Image Url"
              onChange={(e: any) => appendImageUrl(e, i)}
              value={ele.ImageUrl}
            />
          )}
          <img src={del} onClick={() => deleteOption(i)} />
        </div>
      ))}
      {options.length < 4 && (
        <div className={styles.addOption} onClick={addOption}>
          <div> </div>
          <div >Add Option</div>
        </div>
      )}
    </div>
  </div>
);

export default OptionsContainer;
