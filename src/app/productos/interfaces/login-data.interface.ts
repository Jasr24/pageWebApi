export interface ILoginData {
    user: string,
    password: string      
}

export interface IUser {
    id: number;
    name: string;
    role: string;
    lastName: string;
    position: string;
    userToken: string;
}

export interface IResponse<T> {
    status: boolean,
    codeStatus: string,
    message: string,
    data: T,
    count?: number
}