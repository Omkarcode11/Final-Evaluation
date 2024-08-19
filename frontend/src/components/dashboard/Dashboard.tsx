import QuizCard from "../cards/quizCard/QuizCard"
import TrendingQuizeCard from "../cards/trendingQuizCards/TrendingQuizeCard"
import classes from './Dashboard.module.css'

let titles = [
    {number:12,title:'Quiz',color:"#FF5D01"},
    {number:110,title:'Questions',color:"#60B84B"},
    {number:'1.4k',title:'Total',color:"#5076FF"},
]

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