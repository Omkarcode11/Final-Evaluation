import trophy from "./../../assets/trophy.svg";
import classes from "./QuizCompleteBanner.module.css";
type Props = {
  total: number;
  score: number;
  type: "QA" | "POLL";
};

function QuizCompleteBanner({ score, total, type }: Props) {
  return (
    <>
      {type == "QA" ? (
        <div>
          <h2>Congrats Quiz is completed</h2>
          <div>
            <img src={trophy} />
          </div>
          <div>
            Your Score is{" "}
            <span className={classes.score}>
              {score}/{total}
            </span>
          </div>
        </div>
      ) : (
        <h1 className={classes.message}>Thank you 
for participating in the Poll</h1>
      )}
    </>
  );
}

export default QuizCompleteBanner;
