import Spinner from "../../spinner/Spinner";
import styles from "./../questionAnswerForm/QuestionAnswerForm.module.css";

type Props = {
  onClose: () => void;
  state:'UPDATE' | 'CREATE';
  loading:boolean
};

const ButtonGroup = ({ state,onClose,loading }: Props) => (
  <div className={styles.btnGroup}>
    <button onClick={onClose} className={styles.cancel}>Cancel</button>
    {loading?
    <button disabled className={styles.addQuestion}>
      <div className={styles.spinner}>
      <Spinner size="1.5rem"/>
      </div>
      </button>:
    <button className={styles.addQuestion}>{state}</button>
  }
  </div>
);

export default ButtonGroup;
