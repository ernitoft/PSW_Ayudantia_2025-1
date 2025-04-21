import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { User } from "@/interfaces/User";

type AuthContextProps = {
    user: User | null;
    status: 'authenticated' | 'non-authenticated' | 'checking';
    auth: (user: User) => void;
    logout: () => void;
    updateUser: (user: any) => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    user: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const auth = async (user: User) => {
        dispatch({ type: 'auth', payload: { user } });
    }

    const logout = () => {
        dispatch({ type: 'logout' });
    }

    const updateUser = (user: User) => {
        dispatch({ type: 'updated-user', payload: { user } });
    }

    return (
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
    )

}