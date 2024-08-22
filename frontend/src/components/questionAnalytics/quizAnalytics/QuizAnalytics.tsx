import { useParams } from 'react-router-dom'
import classes from './QuizAnalytics.module.css'
import QuestionAnalytics from '../questionAnalytics/QuestionAnalytics'

type Props = {}

function QuizAnalytics({}: Props) {
  let params = useParams()

  console.log(params)

  return (
    <div className={classes.container}>
        <header className={classes.header}>
        <h1 >Question Analysis</h1>
        <div>
          <p>Created on : 04 Sep, 2023</p>
          <p>Impressions : 667</p>
        </div>
        </header>
        <QuestionAnalytics/>
        <QuestionAnalytics/>
        <QuestionAnalytics/>
        <QuestionAnalytics/>
    </div>
  )
}

export default QuizAnalytics