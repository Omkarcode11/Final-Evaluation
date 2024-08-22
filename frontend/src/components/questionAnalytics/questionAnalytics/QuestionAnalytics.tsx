import ImpressionBox from '../impressionBox/ImpressionBox'
import classes from './QuestionAnalytics.module.css'

function QuestionAnalytics() {
  return (
    <div>
        <h2>What is React?</h2>
        <div className={classes.impressionContainer}>
        <ImpressionBox impression={10} text='the Question'/>
        <ImpressionBox impression={4} text='correctly'/>
        <ImpressionBox impression={6} text='Incorrectly'/>
        <ImpressionBox impression={6} text='Incorrectly'/>
        </div>
        <hr/>
    </div>
  )
}

export default QuestionAnalytics