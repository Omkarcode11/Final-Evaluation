import { useParams } from 'react-router-dom'
import classes from './QuizAnalytics.module.css'
import QuestionAnalytics from '../questionAnalytics/QuestionAnalytics'
import useApiClient from '../../../hooks/useApiClient'
import { useEffect, useState } from 'react'

type Props = {}

type Quiz = {
  _id:string,
  quizName : string,
  typeOfQuiz : string,
  questions: question[],
  author:string,
  impression:number,
  createdAt:string,
}

type question = {
   _id:string,
   question:string,
   poll:number[],
   impression:number,
   correctImpression:0,

}

function QuizAnalytics({}: Props) {
  let params = useParams()
  let [quiz,setQuiz] = useState<Quiz>()
  let {getQuizDetail} = useApiClient()

  console.log(params)
  
  async function getAndSetQuiz(){
      if(!params.quizId)return
      let data = await getQuizDetail(params.quizId)
       setQuiz(_=>data)
  }


  useEffect(()=>{
       getAndSetQuiz()
  },[])

  return (
    <div className={classes.container}>
        <header className={classes.header}>
        <h1>{quiz?.quizName} Question Analysis</h1>
        <div>
          <p>Created on : {quiz && new Date(quiz?.createdAt).toLocaleDateString()}</p>
          <p>Impressions : {quiz?.impression}</p>
        </div>
        </header>
        {quiz?.questions.map((ele,i)=>
        <QuestionAnalytics key={ele._id} No={i+1} _id={ele._id} correctImpression={ele.correctImpression} impression={ele.impression}  question={ele.question} poll={ele.poll}/>
        )}
        
    </div>
  )
}

export default QuizAnalytics