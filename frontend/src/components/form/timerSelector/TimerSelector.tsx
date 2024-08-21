import styles from "./../questionAnswerForm/QuestionAnswerForm.module.css";

type Props = {
  selectedTimer: "OFF" | 5 | 10;
  setTimer: (timer: "OFF" | 5 | 10) => void;
};

const TimerSelector = ({ selectedTimer, setTimer }: Props) => (
  <div className={styles.timerContainer}>
    <div>Timer</div>
    <label
      className={
        selectedTimer === "OFF"
          ? `${styles.timer} ${styles.active}`
          : `${styles.timer}`
      }
    >
      <input
        required
        onClick={() => setTimer("OFF")}
        className={styles.inputRadio}
        type="radio"
      />
      OFF
    </label>
    <label
      className={
        selectedTimer === 5
          ? `${styles.timer} ${styles.active}`
          : `${styles.timer}`
      }
    >
      <input
        required
        className={styles.inputRadio}
        onClick={() => setTimer(5)}
        type="radio"
      />
      5 sec
    </label>
    <label
      className={
        selectedTimer === 10
          ? `${styles.timer} ${styles.active}`
          : `${styles.timer}`
      }
    >
      <input
        required
        onClick={() => setTimer(10)}
        className={styles.inputRadio}
        type="radio"
      />
      10 sec
    </label>
  </div>
);

export default TimerSelector;
