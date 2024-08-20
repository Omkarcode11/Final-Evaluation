import React, { FormEvent, useRef, useState } from "react";
import styles from "./questionAnswerForm.module.css";
import add from "./../../../assets/add.svg";
import del from "./../../../assets/deleteIcon.svg";
import close from './../../../assets/close.svg'

type Prop = {
  quizType: "QA" | "POLL";
  quizName: string;
  onClose : ()=>void
};

interface Options {
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  question:string
  options: Option[];
  correctAnswer: string;
  timer: "OFF" | 5 | 10;
}

interface Option {
  text: string;
  ImageUrl: string;
}

const QuestionAnswerForm = ({ quizType, quizName,onClose }: Prop) => {
  const [questions, setQuestions] = useState<Options[]>([
    {question:'', optionType: "Text", options: [{ImageUrl:"",text:""}], correctAnswer: "", timer: "OFF" },
  ]);
  const [selectedIndex,setSelectedIndex] = useState<number>(0)

  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(questions)
  }

  function saveAndAddQuestionHandler(e:FormEvent) {
    e.preventDefault()
    setQuestions((prev) => [
      ...prev,
      {question:'', optionType: questions[selectedIndex].optionType, options: [], correctAnswer: "", timer: "OFF" },
    ]);
    setSelectedIndex(prev=>questions.length)
  }

  function setTimer(timer: "OFF" | 5 | 10) {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions[selectedIndex].timer = timer;
      return newQuestions;
    });
  }

  function setOptionType(str:"Text" | "ImageUrl" | "TextImageUrl" ){

      setQuestions(prev=>{
        let newQuestions = [...prev]
         newQuestions[selectedIndex].optionType = str
         return newQuestions
      })
  }

  function addOption(){
    setQuestions(prev=>{
      let newQuestions = [...prev]
      newQuestions[selectedIndex].options.push({ImageUrl:"",text:""})
      return newQuestions
    })
  }

  function deleteOption(i:number){
    console.log(i,'from deleteOption function')
    setQuestions(prev=>{
      let newQuestions = [...prev]
      newQuestions[selectedIndex].options.splice(i,1)
      return newQuestions
    })
  }

  function appendText(e:any,i:number){
    let text = e.target.value
    setQuestions(prev=>{
      let newQuestions = [...prev]
      newQuestions[selectedIndex].options[i].text = text
      return newQuestions
    })
  }
  function appendImageUrl(e:any,i:number){
    let url = e.target.value
    setQuestions(prev=>{
      let newQuestions = [...prev]
      newQuestions[selectedIndex].options[i].ImageUrl = url
      return newQuestions
    })
  }

  function appendQuestion(e:any,i:number){
    let question = e.target.value
    setQuestions(prev=>{
      let newQuestions = [...prev]
      newQuestions[selectedIndex].question = question
      return newQuestions
    })

  }

  function deleteQuestion(index: number) {
    setQuestions((prev) => {
      let newQuestions = [...prev];
      newQuestions.splice(index, 1); // Remove the selected question
  
      if (newQuestions.length === 0) {
        setSelectedIndex(0); // If no questions left, reset selectedIndex to 0
      } else if (index <= selectedIndex) {
        setSelectedIndex((prevSelectedIndex) => 
          prevSelectedIndex > 0 ? prevSelectedIndex - 1 : 0
        );
      }
  
      return newQuestions;
    });
  }

  
  return (
    <form className={styles.container} onSubmit={submitHandler}>
      <div className={styles.allQuestions}>
        <div className={styles.pileContainer}>
          {questions.map((_, i) => (
            <span onClick={()=>setSelectedIndex(prev=>i)} className={selectedIndex==i?`${styles.border} ${styles.questionNum}`:`${i!=0 && styles.questionNum}`}>
               <img src={close} onClick={()=>deleteQuestion(i)} className={styles.close}/>
              {i + 1}
              </span>
          ))}
          {questions.length < 5 && (
            <button
              type="button"
              onClick={saveAndAddQuestionHandler}
              className={styles.addQuiz}
            >
              <img src={add} />
            </button>
          )}
        </div>
        <h3>Max 5 Questions</h3>
      </div>
      <div>
        <input required
          type="text"
          className={styles.pollInput}
          placeholder="Poll Question"
          value={questions[selectedIndex].question}
          onChange={(e)=>appendQuestion(e,questions.length-1)}
        />
      </div>
      <div className={styles.optionType}>
        <label>Question Type</label>
        <label>
          <input required type="radio" className={styles.radioInput} onChange={()=>setOptionType("Text")} checked={questions[selectedIndex].optionType=='Text'}  value={'Text'} name="option" />
          Text{" "}
        </label>
        <label>
          <input required type="radio" className={styles.radioInput} onChange={()=>setOptionType("ImageUrl")} checked={questions[selectedIndex].optionType=='ImageUrl'} value={'ImageUrl'} name="option" />
          Image URL{" "}
        </label>
        <label>
          <input required type="radio" className={styles.radioInput} onChange={()=>setOptionType('TextImageUrl')} checked={questions[selectedIndex].optionType=='TextImageUrl'} value={'TextImageUrl'} name="option" />
          Text & Image URL{" "}
        </label>
      </div>
    
      <div className={styles.optionsContainer}>
        <div className={styles.options}>
          {questions[selectedIndex].options.map((ele,i)=>
          <div className={styles.option}>
            <input required type="radio" name="option"/>
            {questions[selectedIndex].optionType.includes('Text') &&
            <input required
            type="text"
            className={styles.optionInput}
            placeholder="Text"
            value={ele.text}
            onChange={(e:any)=>appendText(e,i)}
            />
}
            {questions[selectedIndex].optionType.includes('ImageUrl') &&
            <input required
            type="text"
            className={styles.optionInput}
            placeholder="Image Url"
            onChange={(e:any)=>appendImageUrl(e,i)}
            value={ele.ImageUrl}
            />
          }
            <img src={del} onClick={()=>deleteOption(i)} />
          </div> 
)}
          {questions[selectedIndex].options.length<4 &&
          <div className={styles.option}  onClick={addOption}>
            <div> </div>
            <div className={styles.addOption} >Add Option</div>
          </div>
          }
        </div>

        {quizType == "QA" && (
          <div className={styles.timerContainer}>
            <div>Timer</div>
            <label
              className={
                questions[selectedIndex].timer == "OFF"
                  ? `${styles.timer} ${styles.active}`
                  : `${styles.timer}`
              }
            >
              <input required onClick={()=>setTimer('OFF')} className={styles.inputRadio} type="radio" />
              OFF
            </label>
            <label
              className={
                questions[selectedIndex].timer == 5
                  ? `${styles.timer} ${styles.active}`
                  : `${styles.timer}`
              }
            >
              <input required className={styles.inputRadio} onClick={()=>setTimer(5)} type="radio" />5 sec
            </label>
            <label
              className={
                questions[selectedIndex].timer == 10
                  ? `${styles.timer} ${styles.active}`
                  : `${styles.timer}`
              }
            >
              <input required
                onClick={() => setTimer(10)}
                className={styles.inputRadio}
                type="radio"
              />
              10 sec
            </label>
          </div>
        )}
      </div>

      <div className={styles.btnGroup}>
        <button onClick={onClose} className={styles.cancel}>Cancel</button>
        <button className={styles.addQuestion}>Create</button>
      </div>
    </form>
  );
};

export default QuestionAnswerForm;
