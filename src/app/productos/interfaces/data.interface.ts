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

export interface IProductos {
    menu:     IMenu[];
    products: IProduct[];
}

export interface IMenu {
    id:         number;
    icon:       string;
    productId:  number;
    redirectTo: string;
}

export interface IProduct {
    id:               number;
    path:             string;
    image:            string;
    title:            string;
    longDescription:  string;
    shortDescription: string;
}