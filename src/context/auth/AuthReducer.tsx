
export interface AuthState {
    user: any | null,
    status: "authenticated" | "non-authenticated" | "checking",
}

export type AuthAction =
    | { type:'auth', payload : {user : any}}
    | { type:'logout'}
    | { type: 'non-authenticated' }
    | { type: 'updated-user', payload: { user: any } }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type){
        case 'auth':
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated',
            }
        case 'logout':
            return {
                ...state,
                user: null,
                status: 'non-authenticated',
            }
        case 'non-authenticated':
            return {
                ...state,
                user: null,
                status: 'non-authenticated',
            }
        case 'updated-user':
            return {
                ...state,
                user: action.payload.user,
                status: 'authenticated',
            }
        default:
            return state;
    }
} 