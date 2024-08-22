import edit from './../../../assets/edit.svg';
import del from './../../../assets/deleteIcon.svg';
import share from './../../../assets/share.svg';
import classes from './QuizeRow.module.css'
import { Link } from 'react-router-dom';

type Props = {
  num:number,
  quizName:string,
  createdOn:string,
  impressions:string
  showDelete:()=>void
}

function QuizRow({createdOn,impressions,num,quizName,showDelete}: Props) {
  return (
    <tr className={classes.row}>
    <td className={classes.radiusStart}>{num}</td>
    <td>{quizName}</td>
    <td>{createdOn}</td>
    <td>{impressions}</td>
    <td className={classes.icon}>
      <img src={edit}/>
      
      <img src={del} onClick={showDelete}/>
      <img src={share}/>
    </td>
    <td className={classes.radiusEnd}>
      <Link to={'quiz/5'} className={classes.link}>
      Question Wise Analysis
      </Link>
    </td>
  </tr>
  )
}

export default QuizRow