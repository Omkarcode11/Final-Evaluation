import classes from './TrandingQuizeCard.module.css'
type Props = {
    number:number |string,
    title:string,
    color:string
}

function TrendingQuizeCard({number,title,color}: Props) {
  return (
        <div className={classes.container} style={{color:color}} >
            <h1 className={classes.title}>{number}</h1>  
            <div className={classes.subtitle}>{title}</div>
            <div className={classes.subtitle}>Created</div>
            
        </div>
  )
}

export default TrendingQuizeCard