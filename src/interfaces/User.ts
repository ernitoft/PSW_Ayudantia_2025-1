
export interface User {
    
    // Hardcode
    email?: string,
    password?: string,
    token?: string,



    // Postman
    firstName?:              string;
    isFirstNamePublic?:      boolean;
    lastName?:               string;
    isLastNamePublic?:       boolean;
    nickName?:               string;
    bio?:                    string;
    isBioPublic?:            boolean;
    profilePicture?:         string;
    isProfilePicturePublic?: boolean;
}