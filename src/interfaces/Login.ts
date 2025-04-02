export interface ResponseAPILogin {
    token: string;
}

export interface ResponseAPILoginError {
    type:    string;
    title:   string;
    status:  number;
    errors:  Errors;
    traceId: string;
}

export interface Errors {
    Password: string[];
}
