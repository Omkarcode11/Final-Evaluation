import styles from "./../questionAnswerForm/QuestionAnswerForm.module.css";

type Props = {
  onClose: () => void;
  state:'UPDATE' | 'CREATE'
};

const ButtonGroup = ({ state,onClose }: Props) => (
  <div className={styles.btnGroup}>
    <button onClick={onClose} className={styles.cancel}>Cancel</button>
    <button className={styles.addQuestion}>{state}</button>
  </div>
);

export default ButtonGroup;
