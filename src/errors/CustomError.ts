
export class CustomError extends Error {
    constructor(
        public message: string = "Verifique os elementos",
        public elements: {}[],
        public codeError: number
    ){
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
