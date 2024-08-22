import { useState } from 'react'
import QuizRow from '../row/QuizRow'
import classes from './QuizeTable.module.css'
import ConfirmDeleteModal from '../../delete/ConfirmDeleteModal'
import Modal from '../../modal/Modal'



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
  let [showDelete,setShowDelete] = useState(false)

  function onClose(){
    setShowDelete(_=>false)
  }

  function show(){
    setShowDelete(_=>true)
  }

  function deleteQuiz(){

    onClose()
  }

  return (
    <>
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
    <QuizRow showDelete={show} num={i} createdOn={ele.createdOn} impressions={ele.impression} quizName={ele.name}/>
    )}
  </table>
  {showDelete && 
  <Modal onClose={onClose} show={showDelete}>
    <ConfirmDeleteModal quizDelete={deleteQuiz} cancel={onClose}/>
  </Modal>
  }
    </>
  )
}

export default QuizTable