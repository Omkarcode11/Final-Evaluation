import { formatNumber } from '../../../utils/formate'
import classes from './TrandingQuizeCard.module.css'
type Props = {
    number:number,
    title:string,
    color:string
}

function TrendingQuizeCard({number,title,color}: Props) {
  return (
        <div className={classes.container} style={{color:color}} >
            <h1 className={classes.title}>{formatNumber(number)}</h1>  
            <div className={classes.subtitle}>{title}</div>
            <div className={classes.subtitle}>Created</div>
            
        </div>
  )
}

export default TrendingQuizeCard