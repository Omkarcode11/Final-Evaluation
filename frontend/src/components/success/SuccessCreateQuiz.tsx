import classes from './SuccessCreateQuize.module.css'
import close from './../../assets/close.svg'
import { useState } from 'react';
import Toast from '../toast/Toast';
type Props = {
    onClose:()=>void;
    link:string;
}

function SuccessCreateQuiz({onClose,link}: Props) {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = async() => {
    await navigator.clipboard.writeText(link);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div className={classes.successContainer}>
    <h1 className={classes.header} >Congrats your Quiz is Published!</h1>
    <div className={classes.link}>{link}</div>
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