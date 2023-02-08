import { createContext, useState } from "react";

export const AuthContext = createContext({})

export function AuthContextProvider({children}){
    const [user, setUser] = useState({})
    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}