import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type Props = {
    children: ReactNode;
};

// Define the shape of the context value
interface User {
    username: string;
    email: string;
    isAuthorize:boolean
}

interface ContextType {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User >>;
}

// Create the context with a default value of undefined for both user and setUser
export const context = createContext<ContextType | undefined>(undefined);

function MyContextApp({ children }: Props) {
    const [user, setUser] = useState<User>({
        username:"",
        email:"",
        isAuthorize:false
    });

    return (
        <context.Provider value={{ user, setUser }}>
            {children}
        </context.Provider>
    );
}

export default MyContextApp;
