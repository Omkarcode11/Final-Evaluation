import { useParams } from "react-router-dom";
import classes from "./QuizAnalytics.module.css";
import QuestionAnalytics from "../questionAnalytics/QuestionAnalytics";
import useApiClient from "../../../hooks/useApiClient";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formate";
import QuestionAnalyticsShimmer from "../../shimmer/questionAnalitics/QuestionAnalyticsShimmer";

type Props = {};

type Quiz = {
  _id: string;
  quizName: string;
  typeOfQuiz: "QA" | "POLL";
  questions: question[];
  author: string;
  impression: number;
  createdAt: string;
};

type question = {
  _id: string;
  question: string;
  poll: number[];
  impression: number;
  correctImpression: 0;
  options:{text:string,ImageUrl:string}[]
};

function QuizAnalytics({}: Props) {
  let params = useParams();
  let [quiz, setQuiz] = useState<Quiz>();
  let { getQuizDetail, loading } = useApiClient();

  async function getAndSetQuiz() {
    if (!params.quizId) return;
    let data = await getQuizDetail(params.quizId);
    setQuiz((_) => data);

  }

  useEffect(() => {
    getAndSetQuiz();
  }, []);

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>{quiz?.quizName} Question Analysis</h1>
        <div>
          <p>Created on : {quiz && formatDate(quiz?.createdAt)}</p>
          <p>Impressions : {quiz?.impression}</p>
        </div>
      </header>
      {loading ? (
        <div>
          <QuestionAnalyticsShimmer />
          <QuestionAnalyticsShimmer />
          <QuestionAnalyticsShimmer />
        </div>
      ) : (
        quiz?.questions.map((ele, i) => (
          <QuestionAnalytics
            key={ele._id}
            No={i + 1}
            _id={ele._id}
            correctImpression={ele.correctImpression}
            impression={ele.impression}
            question={ele.question}
            poll={ele.poll}
            options={ele.options}
            quizType={quiz.typeOfQuiz}
          />
        ))
      )}
    </div>
  );
}

export default QuizAnalytics;
