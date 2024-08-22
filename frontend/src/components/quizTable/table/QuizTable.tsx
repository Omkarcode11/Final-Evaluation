import { useEffect, useState } from "react";
import QuizRow from "../row/QuizRow";
import classes from "./QuizeTable.module.css";
import ConfirmDeleteModal from "../../delete/ConfirmDeleteModal";
import Modal from "../../modal/Modal";
import useApiClient from "../../../hooks/useApiClient";

type Quizzes = {
  _id: string;
  quizName: string;
  impression: number;
  createdAt: string;
};

type Props = {};

function QuizTable({}: Props) {
  let [quizzes, setQuizzes] = useState<Quizzes[]>([]);
  let [selectedId, setSelectedId] = useState<string | null>(null);

  let { getMyQuizzes, deleteQuiz } = useApiClient();

  let [showDelete, setShowDelete] = useState(false);

  function onClose() {
    setShowDelete((_) => false);
  }

  function show(id: string) {
    setShowDelete((_) => true);
    setSelectedId((_) => id);
  }

  async function deleteQuizHandler() {
    if (selectedId != null) {
      let res = await deleteQuiz(selectedId);
      onClose();
      if (res) {
        setQuizzes((prev) => {
          let newQuizzes = [...prev];
          return newQuizzes.filter((ele) => ele._id != selectedId);
        });
        setSelectedId(_=>null)
      }
    }
  }

  async function getAndSetQuizzes() {
    let data = await getMyQuizzes();
    setQuizzes((_) => data);
  }

  useEffect(() => {
    getAndSetQuizzes();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <table className={classes.tableContainer}>
          <tr className={classes.headers}>
            <th className={classes.radiusStart}>S.No</th>
            <th>Quiz Name</th>
            <th>Created On</th>
            <th>Impression</th>
            <th></th>
            <th className={classes.radiusEnd}></th>
          </tr>
          {quizzes.map((ele, i) => (
            <QuizRow
              showDelete={show}
              num={i + 1}
              createdOn={new Date(ele.createdAt).toLocaleDateString()}
              impressions={String(ele.impression)}
              id={ele._id}
              quizName={ele.quizName}
            />
          ))}
        </table>
        {showDelete && (
          <Modal onClose={onClose} show={showDelete}>
            <ConfirmDeleteModal
              quizDelete={deleteQuizHandler}
              cancel={onClose}
            />
          </Modal>
        )}
      </div>
      {quizzes.length > 10 && <p>scroll down for more</p>}
    </>
  );
}

export default QuizTable;
