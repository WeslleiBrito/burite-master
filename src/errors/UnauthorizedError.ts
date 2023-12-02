import { BaseError } from "./BaseError";


export class UnauthorizedError extends BaseError {

    constructor(
        public message: string = "Senha inválida!",
    ){
        super(message, 401)
    }
}