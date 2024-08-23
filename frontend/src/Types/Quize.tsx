export interface Quiz {
  quizName: string;
  typeOfQuiz: "QA" | "POLL" | 'none';
  questions: Options[];
}



export interface quizNameType {
  name: string;
  type: "QA" | "POLL" | 'none';
}

export interface  QuizName {
  quizName:string,
  typeOfQuiz:"POLL" | "QA" | 'none'
}


export interface Options {
  _id?:string,
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  question: string;
  options: Option[];
  answer: number;
  timer: 0 | 5 | 10;
}

export interface Option {
  text: string;
  ImageUrl: string;
}
