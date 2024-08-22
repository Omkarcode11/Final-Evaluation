import { useParams } from 'react-router-dom'
import classes from './QuizAnalytics.module.css'

type Props = {}

function QuizAnalytics({}: Props) {
  let params = useParams()

  console.log(params)

  return (
    <div>
        <h1>Question Analysis</h1>
    </div>
  )
}

export default QuizAnalytics