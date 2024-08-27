import { formatDate, formatNumber } from "../../../utils/formate";
import eye from "./../../../assets/eye.svg";
import classes from "./QuizeCard.module.css";

type Props = {
  name: string;
  createdAt: string;
  views: number;
};

function QuizCard({ name, createdAt, views }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <h2>{name}</h2>
        <div className={classes.views}>
          <p>{formatNumber(views)}</p>
          <img src={eye} className={classes.icon} />
        </div>
      </div>
      <div className={classes.createdAt}>
        created on : {formatDate(createdAt)}
      </div>
    </div>
  );
}

export default QuizCard;
