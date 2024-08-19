import edit from './../../../assets/edit.svg';
import del from './../../../assets/deleteIcon.svg';
import share from './../../../assets/share.svg';
import classes from './QuizeRow.module.css'

type Props = {
  num:number,
  quizName:string,
  createdOn:string,
  impressions:string
}

function QuizRow({createdOn,impressions,num,quizName}: Props) {
  return (
    <tr className={classes.row}>
    <td className={classes.radiusStart}>{num}</td>
    <td>{quizName}</td>
    <td>{createdOn}</td>
    <td>{impressions}</td>
    <td className={classes.icon}>
      <img src={edit}/>
      <img src={del}/>
      <img src={share}/>
    </td>
    <td className={classes.radiusEnd}>
      Question Wise Analysis
    </td>
  </tr>
  )
}

export default QuizRow