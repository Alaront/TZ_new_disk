export interface FetchRegister {
    email: string,
    password: string,
    confirm_password: string
}

export interface FetchRegisterResponse {
    id: number
    email: string,
}

export interface FetchAuth {
    email: string,
    password: string,
}

export interface FetchAuthResponse {
    accessToken: string,
}

export interface FetchAuthTokenResponse {
    id: number
    email: string,
}

export interface FetchNotes {
    title: string,
    content: string
}

export interface FetchNotesResponse {
    id: number,
    title: string,
    content: string
}
