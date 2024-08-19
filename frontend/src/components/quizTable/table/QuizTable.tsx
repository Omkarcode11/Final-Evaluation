import QuizRow from '../row/QuizRow'
import classes from './QuizeTable.module.css'



let quizInfo = [
  {name:"Quiz 1",createdOn:"19 Aug, 2024",impression:'342'},
  {name:"Quiz 2",createdOn:"19 Aug, 2024",impression:'67'},
  {name:"Quiz 3",createdOn:"19 Aug, 2024",impression:'877'},
  {name:"Quiz 4",createdOn:"19 Aug, 2024",impression:'342'},
  {name:"Quiz 5",createdOn:"19 Aug, 2024",impression:'78'},
  {name:"Quiz 6",createdOn:"19 Aug, 2024",impression:'342'},
  {name:"Quiz 7",createdOn:"19 Aug, 2024",impression:'3462'},
  {name:"Quiz 8",createdOn:"19 Aug, 2024",impression:'69'},
]

type Props = {}

function QuizTable({}: Props) {
  return (
    <table className={classes.tableContainer}>
    <tr className={classes.headers}>
      <th className={classes.radiusStart}>S.No</th>
      <th>Quiz Name</th>
      <th>Created On</th>
      <th>Impression</th>
      <th></th>
      <th className={classes.radiusEnd}></th>
    </tr>
    {quizInfo.map((ele,i)=>
    <QuizRow num={i} createdOn={ele.createdOn} impressions={ele.impression} quizName={ele.name}/>
    )}
  </table>
  )
}

export default QuizTable