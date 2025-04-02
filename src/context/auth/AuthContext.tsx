import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    user: any | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: any) => void;
    logout: () => void;
    updateUser: (user: any) => void;
}

const authInitialState: AuthState = {
    status: 'checking', 
    user: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
    useEffect(() => {
        // Checkear el token
    },[])

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const checkToken = async() => {
        try{
            console.log('Checking token...')
        } catch(error) {
            console.log(error)
            dispatch({ type: 'non-authenticated' }); 
        }
    }

    const auth = async(user: any) => {
        dispatch({ type: 'auth', payload: user });
    }

    const logout = () => {
        dispatch({ type: 'logout' });
    }

    const updateUser = (user: any) => {
        dispatch({ type: 'updated-user', payload: user });
    }

    <AuthContext.Provider
        value={{
            ...state,
            auth,
            logout,
            updateUser,
        }}
    >
        {children}
    </AuthContext.Provider>

}