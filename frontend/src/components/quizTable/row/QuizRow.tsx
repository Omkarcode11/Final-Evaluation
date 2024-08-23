import edit from './../../../assets/edit.svg';
import del from './../../../assets/deleteIcon.svg';
import share from './../../../assets/share.svg';
import classes from './QuizeRow.module.css'
import { Link } from 'react-router-dom';
import Toast from '../../toast/Toast';
import { useState } from 'react';

type Props = {
  num:number,
  quizName:string,
  createdOn:string,
  impressions:string
  showDelete:(id:string)=>void
  id:string
  openUpdate:(id:string)=>void
}

function QuizRow({createdOn,impressions,num,quizName,showDelete,id,openUpdate}: Props) {
  const [showToast, setShowToast] = useState(false);


  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  function editHandler(){
    openUpdate(id)
  }

  return (
    <tr className={classes.row}>
    <td className={classes.radiusStart}>{num}</td>
    <td>{quizName.substring(0,15)}{quizName.length>15 && '...'}</td>
    <td>{createdOn}</td>
    <td>{impressions}</td>
    <td className={classes.icon}>
      <img src={edit} onClick={editHandler}/>
      <img src={del} onClick={()=>showDelete(id)}/>
      <img src={share} onClick={handleShowToast}/>
    </td>
    <td className={classes.radiusEnd}>
      <Link to={`quiz/${id}`} className={classes.link}>
      Question Wise Analysis
      </Link>
    </td>




    {showToast && (
        <Toast message="Link copied to Clipboard" onClose={handleCloseToast} />
      )}
  </tr>
  )
}

export default QuizRow