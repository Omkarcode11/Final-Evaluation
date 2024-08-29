import ImpressionBox from "../impressionBox/ImpressionBox";
import classes from "./QuestionAnalytics.module.css";

type Props = {
  _id: string;
  question: string;
  poll: number[];
  impression: number;
  correctImpression: number;
  No: number;
  quizType: "QA" | "POLL";
};

function QuestionAnalytics({
  No,
  correctImpression,
  impression,
  poll,
  question,
  quizType,
}: Props) {
  return (
    <div>
      <h2>
        Q.{No} {question}
      </h2>
      <div className={classes.impressionContainer}>
        {quizType == "QA" ? (
          <>
            <ImpressionBox impression={impression} text="people Attempted the Question" />
            <ImpressionBox impression={correctImpression} text="people Attempted correctly" />
            <ImpressionBox
              impression={impression - correctImpression}
              text="people Attempted Incorrectly"
            />
          </>
        ) : (
          <>
            {poll.map((ele,i) => <ImpressionBox key={i} impression={ele} text={`Option ${i+1}`}/>)}
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

export default QuestionAnalytics;
