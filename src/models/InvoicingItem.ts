

export class InvoicingItem {
    
    constructor(
        private data: data
        ){}
    
    public getAllInvoicingItem = (): InvoicingItemModel => {
        return {
            codProduct: this.data.codProduct,
            codSale: this.data.codSale,
            nameProduct: this.data.nameProduct,
            nameSubgroup: this.data.nameSubgroup,
            codSubgroup: this.data.codSubgroup,
            baseProfit: this.data.baseProfit,
            quantity: this.data.quantity,
            quantityReturned: this.data.quantityReturned,
            amountSale: this.data.amountSale,
            unitaryValue: this.data.unitaryValue,
            cost: this.data.cost,
            discount: this.data.discount,
            conversionFactor: this.data.conversionFactor,
            dateSale: this.data.dateSale
        }
    }

    public getCodProduct = (): number => {
        return this.data.codProduct
    }

    public getCodSale = (): number => {
        return this.data.codSale
    }

    public getNameProduct = (): string => {
        return this.data.nameProduct
    }

    public getNameSubgroup = (): string => {
        return this.data.nameSubgroup
    }

    public getCodSubgroup = (): number => {
        return this.data.codSubgroup
    }

    public getBaseProfit = (): number => {
        return this.data.baseProfit
    }

    public getQuantity = (): number => {
        return this.data.quantity
    }

    public getQuantityReturned = (): number => {
        return this.data.quantityReturned
    }

    public getAmountSale = (): number => {
        return this.data.amountSale
    }

    public getUnitaryValue = (): number => {
        return this.data.unitaryValue
    }

    public getUnitaryCost = (): number => {
        return this.data.cost
    }

    public getDiscount = (): number => {
        return this.data.discount
    }

    public getConversionFactory = (): number => {
        return this.data.conversionFactor
    }

    public getDateSale = (): string => {
        return this.data.dateSale
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

interface data {
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
    discount: number,
    conversionFactor: number,
    dateSale: string
}