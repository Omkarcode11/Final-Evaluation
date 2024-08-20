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
