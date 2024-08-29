import { useEffect, useState } from "react";
import useApiClient from "../../hooks/useApiClient";
import QuizCard from "../cards/quizCard/QuizCard";
import TrendingQuizeCard from "../cards/trendingQuizCards/TrendingQuizeCard";
import classes from "./Dashboard.module.css";
import TrendingQuizWireFrame from "../shimmer/trendingQuiz/TrendingQuizWireFrame";

type Trending = {
  quizName: string,
  impression: number,
  createdAt: string
}


function Dashboard() {
  let { getMyStats, getTrendingQuiz,loading } = useApiClient();
  let [quizzes, setQuizzes] = useState<Trending[]>([]);
  let [titles, setTitles] = useState([
    { number: 0, title: "Quiz", color: "#FF5D01" },
    { number: 0, title: "Questions", color: "#60B84B" },
    { number: 0, title: "Impression", color: "#5076FF" },
  ]);

  async function getAndSetStats() {
    let data = await getMyStats();
    let quizzes = await getTrendingQuiz();
    setTitles((prev) => {
      let newTitles = [...prev];
      newTitles[0].number = data.quizCreated;
      newTitles[1].number = data.totalQuestions;
      newTitles[2].number = data.totalImpression;
      return newTitles;
    });
    setQuizzes((_) => quizzes);
  }

  useEffect(() => {
    getAndSetStats();
  }, []);

  return (
    <div className={classes.container}>
      {loading ? <TrendingQuizWireFrame/> :
      <>
      <div className={classes.cardContainer}>
       { titles.map((ele) => (
         <TrendingQuizeCard
         number={ele.number}
         title={ele.title}
         color={ele.color}
         />
        ))
}
      </div>
      <div className={classes.quizCardContainer}>
        <h1>Trending Quizs</h1>
        <div className={classes.quizContainer}>
          {quizzes.map((ele) => (
            <QuizCard
            views={ele.impression}
            createdAt={ele.createdAt}
            name={ele.quizName}
              />
            ))}
        </div>
      </div>
      </>
      }
    </div>
  );
}

export default Dashboard;
