import { useEffect, useState } from 'react'
import QuizRow from '../row/QuizRow'
import classes from './QuizeTable.module.css'
import ConfirmDeleteModal from '../../delete/ConfirmDeleteModal'
import Modal from '../../modal/Modal'
import useApiClient from '../../../hooks/useApiClient'



// let quizInfo = [
//   {name:"Quiz 1",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 2",createdAt:"19 Aug, 2024",impression:'67'},
//   {name:"Quiz 3",createdAt:"19 Aug, 2024",impression:'877'},
//   {name:"Quiz 4",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 5",createdAt:"19 Aug, 2024",impression:'78'},
//   {name:"Quiz 6",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 7",createdAt:"19 Aug, 2024",impression:'3462'},
//   {name:"Quiz 8",createdAt:"19 Aug, 2024",impression:'69'},
//   {name:"Quiz 1",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 2",createdAt:"19 Aug, 2024",impression:'67'},
//   {name:"Quiz 3",createdAt:"19 Aug, 2024",impression:'877'},
//   {name:"Quiz 4",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 5",createdAt:"19 Aug, 2024",impression:'78'},
//   {name:"Quiz 6",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 7",createdAt:"19 Aug, 2024",impression:'3462'},
//   {name:"Quiz 8",createdAt:"19 Aug, 2024",impression:'69'},
//   {name:"Quiz 1",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 2",createdAt:"19 Aug, 2024",impression:'67'},
//   {name:"Quiz 3",createdAt:"19 Aug, 2024",impression:'877'},
//   {name:"Quiz 4",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 5",createdAt:"19 Aug, 2024",impression:'78'},
//   {name:"Quiz 6",createdAt:"19 Aug, 2024",impression:'342'},
//   {name:"Quiz 7",createdAt:"19 Aug, 2024",impression:'3462'},
//   {name:"Quiz 8",createdAt:"19 Aug, 2024",impression:'69'},
// ]

type Quizzes = {
  _id : string,
  quizName:string,
  impression:number,
  createdAt:string
}

type Props = {}

function QuizTable({}: Props) {
  let [quizzes,setQuizzes] = useState<Quizzes[]>([])
   

  let {getMyQuizzes} = useApiClient()

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

  async function getAndSetQuizzes(){
    let data = await getMyQuizzes()
    setQuizzes(_=>data)
  }

  useEffect(()=>{
    getAndSetQuizzes()
  },[])



  return (
    <>
    <div className={classes.container}>
    <table className={classes.tableContainer}>
    <tr className={classes.headers}>
      <th className={classes.radiusStart}>S.No</th>
      <th>Quiz Name</th>
      <th>Created On</th>
      <th>Impression</th>
      <th></th>
      <th className={classes.radiusEnd}></th>
    </tr>
    {quizzes.map((ele,i)=>
    <QuizRow showDelete={show} num={i+1} createdOn={new Date(ele.createdAt).toLocaleDateString()} impressions={String(ele.impression)} id={ele._id} quizName={ele.quizName}/>
    )}
  </table>
  {showDelete && 
  <Modal onClose={onClose} show={showDelete}>
    <ConfirmDeleteModal quizDelete={deleteQuiz} cancel={onClose}/>
  </Modal>
  }
    </div>
    {quizzes.length>10 &&
  <p>scroll down for more</p>
    }
  </>
  )
}

export default QuizTable