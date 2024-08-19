import { useState } from "react"
import Modal from "../modal/Modal"
import QuizTypeForm from "../form/QuizTypeForm"

type Props = {}

function CreateQuiz({}: Props) {
  let [show,setShow] = useState(true)
  return (
    <div>
      <Modal onClose={()=>setShow(prev=>prev)} show={show}><QuizTypeForm/></Modal>
    </div>
  )
}

export default CreateQuiz