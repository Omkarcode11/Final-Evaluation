import classes from './SuccessCreateQuize.module.css'
import close from './../../assets/close.svg'
type Props = {
    onClose:()=>void
}

function SuccessCreateQuiz({onClose}: Props) {
  return (
    <div className={classes.successContainer}>
    <h1 className={classes.header} >Congrats your Quiz is Published!</h1>
    <div className={classes.link}>your link is here </div>
    <button type='button' onClick={onClose} className={classes.sharebtn}>Share</button>
    <div className={classes.close} onClick={onClose}>
    <img src={close}/>
    </div>
    </div>

  )
}

export default SuccessCreateQuiz