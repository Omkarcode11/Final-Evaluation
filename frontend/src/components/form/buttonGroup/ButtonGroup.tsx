import styles from "./../questionAnswerForm/QuestionAnswerForm.module.css";

type Props = {
  onClose: () => void;
};

const ButtonGroup = ({ onClose }: Props) => (
  <div className={styles.btnGroup}>
    <button onClick={onClose} className={styles.cancel}>Cancel</button>
    <button className={styles.addQuestion}>Create</button>
  </div>
);

export default ButtonGroup;
