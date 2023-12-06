

export class InvoicingItem {
    constructor(
        private codProduct: number,
        private codSale: number,
        private nameProduct: string,
        private nameSubgroup: string,
        private codSubgroup: number,
        private baseProfit: number,
        private quantity: number,
        private quantityReturned: number,
        private amountSale: number,
        private unitaryValue: number,
        private cost: number,
        private discount: number,
        private conversionFactor: number,
        private dateSale: string
    ){}
    
    public getAllInvoicingItem = (): InvoicingItemModel => {
        return {
            codProduct: this.codProduct,
            codSale: this.codSale,
            nameProduct: this.nameProduct,
            nameSubgroup: this.nameSubgroup,
            codSubgroup: this.codSubgroup,
            baseProfit: this.baseProfit,
            quantity: this.quantity,
            quantityReturned: this.quantityReturned,
            amountSale: this.amountSale,
            unitaryValue: this.unitaryValue,
            cost: this.cost,
            discount: this.discount,
            conversionFactor: this.conversionFactor,
            dateSale: this.dateSale
        }
    }

    public getCodProduct = (): number => {
        return this.codProduct
    }

    public getCodSale = (): number => {
        return this.codSale
    }

    public getNameProduct = (): string => {
        return this.nameProduct
    }

    public getNameSubgroup = (): string => {
        return this.nameSubgroup
    }

    public getCodSubgroup = (): number => {
        return this.codSubgroup
    }

    public getBaseProfit = (): number => {
        return this.baseProfit
    }

    public getQuantity = (): number => {
        return this.quantity
    }

    public getQuantityReturned = (): number => {
        return this.quantityReturned
    }

    public getAmountSale = (): number => {
        return this.amountSale
    }

    public getUnitaryValue = (): number => {
        return this.unitaryValue
    }

    public getUnitaryCost = (): number => {
        return this.cost
    }

    public getDiscount = (): number => {
        return this.discount
    }

    public getConversionFactory = (): number => {
        return this.conversionFactor
    }

    public getDateSale = (): string => {
        return this.dateSale
    }
}


export interface InvoicingItemModel {
    codProduct: number,
    codSale: number,
    nameProduct: string,
    nameSubgroup: string,
    codSubgroup: number,
    baseProfit: number,
    quantity: number,
    quantityReturned: number,
    amountSale: number,
    unitaryValue: number,
    cost: number,
    discount: number
    conversionFactor: number,
    dateSale: string
}