type Props = {}

function QuizTypeForm({}: Props) {
  return (
    <div>
        <div>
            <input type="text" placeholder="Quiz Name" />
        </div>
        <div>
           <label>Quiz Type</label>
           <label>
            Q & A
           <input type="radio" name="quizType"/>
           </label>
           <label>
            Poll Type
           <input type="radio" name="quizType"/>
           </label>
        </div>
    </div>
  )
}

export default QuizTypeForm