import ImpressionBox from '../impressionBox/ImpressionBox'
import classes from './QuestionAnalytics.module.css'

type Props = {
  _id:string,
  question:string,
  poll:number[],
  impression:number,
  correctImpression:number,
  No:number
}

function QuestionAnalytics({No,_id,correctImpression,impression,poll,question}:Props) {
  return (
    <div>
        <h2>Q.{No} {question}</h2>
        <div className={classes.impressionContainer}>
        <ImpressionBox impression={impression} text='the Question'/>
        <ImpressionBox impression={correctImpression} text='correctly'/>
        <ImpressionBox impression={impression-correctImpression} text='Incorrectly'/>
        </div>
        <hr/>
    </div>
  )
}

export default QuestionAnalytics