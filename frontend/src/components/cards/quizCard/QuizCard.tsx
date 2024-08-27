import eye from './../../../assets/eye.svg'
import classes from './QuizeCard.module.css'


type Props = {
    name:string
    createdAt:string,
    views:number
}

function QuizCard({name,createdAt,views}: Props) {
  return (
    <div className={classes.container}>
        <div className={classes.headerContainer}>
        <h2>{name}</h2>
        <div className={classes.views}>
        <p>{views}</p>
        <img src={eye} className={classes.icon} />
        </div>
        </div>
        <div className={classes.createdAt}>
         created on : {new Date(createdAt).toLocaleDateString()}
        </div>
    </div>
  )
}

export default QuizCard