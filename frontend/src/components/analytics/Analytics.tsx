import classes from "./Analytics.module.css";
import QuizTable from "../quizTable/table/QuizTable";


type Props = {};

function Analytics({}: Props) {
  return( 
  <div className={classes.container}>
    <h1 className={classes.header}>Quiz Analysis</h1>
    <div className={classes.quizTableContainer}>
     <QuizTable/>
    </div>
    </div>
    );
}

export default Analytics;
