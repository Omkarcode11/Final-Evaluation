import classes from "./ConfirmDeleteModal.module.css";

type Props = {
  quizDelete:()=>void 
  cancel:()=>void
}


function ConfirmDeleteModal({cancel,quizDelete}:Props) {
  return <div className={classes.container}>
    <h1 className={classes.header}>
    Are you confirm you want to delete ?
    </h1>
    <div className={classes.btnGroup}>
      <button className={classes.delete} onClick={quizDelete}>Delete</button>
      <button className={classes.cancel} onClick={cancel} >cancel</button>
    </div>
  </div>;
}

export default ConfirmDeleteModal;
