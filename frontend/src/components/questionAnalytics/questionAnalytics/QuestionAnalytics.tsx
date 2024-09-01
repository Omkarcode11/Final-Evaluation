import ImpressionBox from "../impressionBox/ImpressionBox";
import classes from "./QuestionAnalytics.module.css";

type Props = {
  _id: string;
  question: string;
  poll: number[];
  options:{text:string,ImageUrl:string}[]
  impression: number;
  correctImpression: number;
  No: number;
  quizType: "QA" | "POLL";
};


function QuestionAnalytics({
  options,
  No,
  correctImpression,
  impression,
  poll,
  question,
  quizType,
}: Props) {


  console.log(options)


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
            {poll.map((ele,i) => <ImpressionBox key={i} impression={ele} text={`${options[i]?.text} ${options[i].ImageUrl}`}/>)}
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

export default QuestionAnalytics;
