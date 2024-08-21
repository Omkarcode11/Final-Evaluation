import styles from "./../questionAnswerForm/QuestionAnswerForm.module.css";

type Props = {
  selectedOptionType: "Text" | "ImageUrl" | "TextImageUrl";
  setOptionType: (str: "Text" | "ImageUrl" | "TextImageUrl") => void;
};

const QuestionTypeSelector = ({ selectedOptionType, setOptionType }: Props) => (
  <div className={styles.optionType}>
    <label>Question Type</label>
    <label>
      <input
        required
        type="radio"
        className={styles.radioInput}
        onChange={() => setOptionType("Text")}
        checked={selectedOptionType === "Text"}
        value={"Text"}
        name="type"
      />
      Text{" "}
    </label>
    <label>
      <input
        required
        type="radio"
        className={styles.radioInput}
        onChange={() => setOptionType("ImageUrl")}
        checked={selectedOptionType === "ImageUrl"}
        value={"ImageUrl"}
        name="type"
      />
      Image URL{" "}
    </label>
    <label>
      <input
        required
        type="radio"
        className={styles.radioInput}
        onChange={() => setOptionType("TextImageUrl")}
        checked={selectedOptionType === "TextImageUrl"}
        value={"TextImageUrl"}
        name="type"
      />
      Text & Image URL{" "}
    </label>
  </div>
);

export default QuestionTypeSelector;
