import  { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { Quiz } from '../../Types/Quize';

type Props = {
    children: ReactNode;
};

// Define the shape of the context value
interface QuizContextType {
    quiz: Quiz | undefined;
    setQuiz: Dispatch<SetStateAction<Quiz | undefined>>;
}

// Create the context with a default value of undefined for both quiz and setQuiz
export const context = createContext<QuizContextType | undefined>(undefined);

function MyContextApp({ children }: Props) {
    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

    return (
        <context.Provider value={{ quiz, setQuiz }}>
            {children}
        </context.Provider>
    );
}

export default MyContextApp;
