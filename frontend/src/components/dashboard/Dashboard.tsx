import { useEffect, useState } from "react"
import useApiClient from "../../hooks/useApiClient"
import QuizCard from "../cards/quizCard/QuizCard"
import TrendingQuizeCard from "../cards/trendingQuizCards/TrendingQuizeCard"
import classes from './Dashboard.module.css'



let quizes = [
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
  {name:"Quiz1",views:484,createdAt:'04 Aug 2024'},
]

function Dashboard() {
  let {getMyStats} = useApiClient()
  let [titles,setTitles] = useState([
    {number:0,title:'Quiz',color:"#FF5D01"},
    {number:0,title:'Questions',color:"#60B84B"},
    {number:0,title:'Impression',color:"#5076FF"},
])

async function getAndSetStats(){
  let data = await getMyStats()
    setTitles(prev=>{
      let newTitles = [...prev]
      newTitles[0].number = data.quizCreated
      newTitles[1].number = data.totalQuestions
      newTitles[2].number = data.totalImpression
      return newTitles
    })

}


useEffect(()=>{
  getAndSetStats()
},[])

 
  return (
    <div className={classes.container}>
    <div className={classes.cardContainer}>
        {titles.map(ele=>
        <TrendingQuizeCard number={ele.number} title={ele.title} color={ele.color}/>
    )}
    </div>
    <div className={classes.quizCardContainer}>
      <h1>Trending Quizs</h1>
      <div className={classes.quizContainer}>
        {quizes.map(ele=>
        <QuizCard views={ele.views} createdAt={ele.createdAt} name={ele.name}/>
        )}
      </div>
    </div>

    </div>
  )
}

export default Dashboard