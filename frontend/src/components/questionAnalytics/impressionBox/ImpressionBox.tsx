import classes from './ImpressionBox.module.css'

type Props = {
    impression:number,
    text:string
}

function ImpressionBox({impression,text}: Props) {
  return (
    <div className={classes.container}>
       <h2>{impression}</h2>
       <p>people Attempted {text}</p>
    </div>
  )
}

export default ImpressionBox