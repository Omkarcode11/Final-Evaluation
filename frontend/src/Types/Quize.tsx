export interface Quiz {
  name: string;
  type: "QA" | "POLL";
  questions: question[];
}

export interface question {
  question: string;
  options: string[];
  answer: string;
  timer: string;
}

export interface quizNameType {
  name: string;
  type: "QA" | "POLL";
}


export interface Options {
  optionType: "Text" | "ImageUrl" | "TextImageUrl";
  question: string;
  options: Option[];
  answer: number;
  timer: "OFF" | 5 | 10;
}

export interface Option {
  text: string;
  ImageUrl: string;
}
