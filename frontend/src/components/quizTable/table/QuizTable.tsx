import { useEffect, useState } from "react";
import QuizRow from "../row/QuizRow";
import classes from "./QuizeTable.module.css";
import ConfirmDeleteModal from "../../delete/ConfirmDeleteModal";
import Modal from "../../modal/Modal";
import useApiClient from "../../../hooks/useApiClient";
import QuestionAnswerForm from "../../form/questionAnswerForm/QuestionAnswerForm";
import { Options } from "../../../Types/Quize";

type Quizzes = {
  _id: string;
  quizName: string;
  impression: number;
  createdAt: string;
};

type Props = {};

function QuizTable({}: Props) {
  let { getQuestion } = useApiClient();
  let [quizzes, setQuizzes] = useState<Quizzes[]>([]);
  let [questions, setQuestions] = useState<Options[]>([]);
  let [selectedId, setSelectedId] = useState<string | null>(null);
  let { getMyQuizzes, deleteQuiz } = useApiClient();
  let [showDelete, setShowDelete] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);

  function onClose() {
    setShowDelete((_) => false);
    setSelectedId((_) => null);
  }

  function closeUpdateModal() {
    setShowUpdate((_) => false);
    setSelectedId((_) => null);
  }

  async function getAndSetQuestion(id:string) {
    // if (selectedId) {
      let data = await getQuestion(id);
      setQuestions(() => data);
      setShowUpdate((_) => true);
    // }/
  }

  async function openUpdateModal(id: string) {
    console.log('edit click')
    setSelectedId((_) => id);
    await getAndSetQuestion(id);
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
        setSelectedId((_) => null);
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
              openUpdate={openUpdateModal}
            />
          ))}
        </table>
        {showUpdate && (
          <Modal onClose={closeUpdateModal} show={showUpdate}>
            <QuestionAnswerForm
              onClose={closeUpdateModal}
              quizName=""
              quizType="QA"
              showSuccessModal={() => {}}
              questions={questions}
              setQuestions={setQuestions}
              state="UPDATE"
            />
          </Modal>
        )}
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
