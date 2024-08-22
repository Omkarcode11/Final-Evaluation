import classes from './SuccessCreateQuize.module.css'
import close from './../../assets/close.svg'
import { useState } from 'react';
import Toast from '../toast/Toast';
type Props = {
    onClose:()=>void
}

function SuccessCreateQuiz({onClose}: Props) {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className={classes.successContainer}>
    <h1 className={classes.header} >Congrats your Quiz is Published!</h1>
    <div className={classes.link}>your link is here </div>
    <button type='button' onClick={handleShowToast} className={classes.sharebtn}>Share</button>
    <div className={classes.close} onClick={onClose}>
    <img src={close}/>
    </div>
    {
      showToast && <Toast message='Link Copied to Clipboard!' onClose={handleCloseToast} />
    }

    </div>

  )
}

export default SuccessCreateQuiz