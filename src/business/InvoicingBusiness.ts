import { InvoicingDatabase } from "../database/InvoicingDatabase";
import { UpdateTotalValuesDatabase } from "../database/UpdateTotalValuesDatabase";
import { InputDateDTO } from "../dtos/InputDate.dto";
import { InvoicingItem, InvoicingItemModel } from "../models/InvoicingItem";
import { ResumeSubgroup } from "../models/ResumeSubgroups";
import { roundValues } from "../services/RoundValues";
import { InvoicingItemDB, ResumeSubgroupModel } from "../types/types";



export class InvoicingBusiness {

    constructor(
        private invoicingDatabase: InvoicingDatabase,
        private updateTotalValuesDatabase: UpdateTotalValuesDatabase
    ) { }

    public getAllSaleItem = async (): Promise<{ [key: string]: ResumeSubgroupModel }> => {

        const result = await this.invoicingDatabase.getItensInvoicingSubgroupAll()

        const [totals] = await this.updateTotalValuesDatabase.findTotalValue()
        const date = new Date().toDateString()
        const resumeSubgroup: { [key: string]: ResumeSubgroupModel } = {}

        const itens = result.map((item): InvoicingItemModel => {

            const newInvoicingItem = new InvoicingItem({
                codProduct: item.produto,
                codSale: item.venda,
                nameProduct: item.descricao,
                nameSubgroup: item.prod_dsubgrupo,
                codSubgroup: item.prod_subgrupo,
                baseProfit: item.plucro,
                quantity: item.qtd,
                quantityReturned: item.qtd_devolvida,
                amountSale: item.total,
                unitaryValue: item.vrunitario,
                cost: item.vrcusto_composicao,
                discount: item.desconto,
                conversionFactor: item.fator,
                dateSale: item.dtvenda
            }
            )

            return newInvoicingItem.getAllInvoicingItem()
        })


        itens.forEach((item) => {

            if (!resumeSubgroup[item.codSubgroup]) {

                const itensSubgrupo = itens.filter((sale) => {
                    return sale.codSubgroup === item.codSubgroup
                })

                const amountQuantity = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
                const amountQuantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - amountQuantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const fixedUnitExpense = amountFixed / (amountQuantity - amountQuantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / (amountDiscount + amountInvoicing)
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup(
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - amountQuantityReturned, 2),
                    roundValues('round', amountQuantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 3),
                    item.baseProfit,
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    date

                )
                resumeSubgroup[item.codSubgroup] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })

        return resumeSubgroup

    }

    public getProductsTest = async () => {
        const result = await this.invoicingDatabase.getItensInvoicingSubgroupAllTest()
        const dateInitial = new Date(result[0].dtvenda)
        const numberMonths = Math.floor(((Date.now() - new Date(dateInitial.getFullYear(), dateInitial.getMonth(), dateInitial.getDate()).getTime()) / (1000 * 60 * 60 * 24 * 365)) * 12)
        const dates: Date[] = []
        dateInitial.setDate(31)

        if(dateInitial.getDate() >= 1 && dateInitial.getDate() <= 3){
            dateInitial.setDate(31 - dateInitial.getDate())
        }

        const n = dateInitial.getMonth()

        for (let i = 0; i < numberMonths + 1; i++) {
            const copyDate = new Date(dateInitial.getTime())

            copyDate.setMonth(n + i)

            if(copyDate.getDate() >= 1 && copyDate.getDate() <= 3){
                copyDate.setDate(31 - copyDate.getDate())
            }

            dates.push(copyDate)
        }

        const datas = result.map(item => {
            const values: InvoicingItemDB = {
                descricao: item.descricao,
                dtvenda: item.dtvenda,
                fator: item.fator,
                total: item.total,
                plucro: item.plucro,
                prod_dsubgrupo: item.prod_dsubgrupo,
                prod_subgrupo: item.prod_subgrupo,
                produto: item.produto,
                qtd: item.qtd,
                qtd_devolvida: item.qtd_devolvida,
                venda: item.venda,
                vrcusto_composicao: item.vrcusto_composicao,
                vrunitario: item.vrunitario,
                total_venda: item.total_venda,
                nome: item.nome,
                fun_nome: item.fun_nome,
                vendedor: item.vendedor,
                desconto: item.desconto,
                acrescimo: item.acrescimo,
                cartao: item.cartao,
                cartaod: item.cartaod,
                cheque: item.cheque,
                credito: item.credito,
                dinheiro: item.dinheiro,
                prazo: item.prazo,
                transferencia: item.transferencia
            }

            return values
        })
        

        return dates

    }
    public getSaleSubgroupByDate = async (input?: { initialDate?: Date, finalDate?: Date }): Promise<{ [key: string]: ResumeSubgroupModel }> => {
        
        let initialDate: string = "1970-01-01"
        let finalDate: string = new Date().toISOString()

        if(input){
            if(input.initialDate){
                initialDate = input.initialDate.toISOString()
            }
            if(input.finalDate){
                finalDate = input.finalDate.toISOString()
            }
        }

        const result = await this.invoicingDatabase.getSaleItemByDate({ initialDate: initialDate, finalDate: finalDate })
        const [totals] = await this.updateTotalValuesDatabase.findTotalValue()
        
        const date = new Date().toDateString()
        const resumeSubgroup: { [key: string]: ResumeSubgroupModel } = {}

        const itens = result.map((item): InvoicingItemModel => {

            const newInvoicingItem = new InvoicingItem(
                {
                    codProduct: item.produto,
                    codSale: item.venda,
                    nameProduct: item.descricao,
                    nameSubgroup: item.prod_dsubgrupo,
                    codSubgroup: item.prod_subgrupo,
                    baseProfit: item.plucro,
                    quantity: item.qtd,
                    quantityReturned: item.qtd_devolvida,
                    amountSale: item.total,
                    unitaryValue: item.vrunitario,
                    cost: item.vrcusto_composicao,
                    discount: item.desconto,
                    conversionFactor: item.fator,
                    dateSale: item.dtvenda
                }
            )

            return newInvoicingItem.getAllInvoicingItem()
        })

        itens.forEach((item) => {

            if (!resumeSubgroup[item.codSubgroup]) {

                const itensSubgrupo = itens.filter((sale) => {
                    return sale.codSubgroup === item.codSubgroup
                })

                const amountQuantity = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
                const amountQuantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - amountQuantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const fixedUnitExpense = amountFixed / (amountQuantity - amountQuantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / amountInvoicing
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup(
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - amountQuantityReturned, 2),
                    roundValues('round', amountQuantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 2),
                    item.baseProfit,
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    date

                )
                resumeSubgroup[item.codSubgroup] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })

        return resumeSubgroup

    }

    public getSaleItemByDate = async (input?: { initialDate?: Date, finalDate?: Date }): Promise<{ [key: string]: ResumeSubgroupModel }> => {
        
        let initialDate: string = "1970-01-01"
        let finalDate: string = new Date().toISOString()

        if(input){
            if(input.initialDate){
                initialDate = input.initialDate.toISOString()
            }
            if(input.finalDate){
                finalDate = input.finalDate.toISOString()
            }
        }

        const result = await this.invoicingDatabase.getSaleItemByDate({ initialDate: initialDate, finalDate: finalDate })
        const [totals] = await this.updateTotalValuesDatabase.findTotalValue()
        
        const date = new Date().toDateString()
        const resumeSubgroup: { [key: string]: ResumeSubgroupModel } = {}

        const itens = result.map((item): InvoicingItemModel => {

            const newInvoicingItem = new InvoicingItem(
                {
                    codProduct: item.produto,
                    codSale: item.venda,
                    nameProduct: item.descricao,
                    nameSubgroup: item.prod_dsubgrupo,
                    codSubgroup: item.prod_subgrupo,
                    baseProfit: item.plucro,
                    quantity: item.qtd,
                    quantityReturned: item.qtd_devolvida,
                    amountSale: item.total,
                    unitaryValue: item.vrunitario,
                    cost: item.vrcusto_composicao,
                    discount: item.desconto,
                    conversionFactor: item.fator,
                    dateSale: item.dtvenda
                }
            )

            return newInvoicingItem.getAllInvoicingItem()
        })

        itens.forEach((item) => {

            if (!resumeSubgroup[item.nameProduct]) {

                const itensSubgrupo = itens.filter((sale) => {
                    return sale.nameProduct === item.nameProduct
                })

                const amountQuantity = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
                const amountQuantityReturned = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + currentValue.quantityReturned, 0)
                const amountInvoicing = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.amountSale / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountCost = ((itensSubgrupo.reduce((accumulator, currentValue) => accumulator + (currentValue.cost * currentValue.quantity), 0)) / amountQuantity) * (amountQuantity - amountQuantityReturned)
                const amountDiscount = itensSubgrupo.reduce((accumulator, currentValue) => accumulator + ((currentValue.discount / currentValue.quantity) * (currentValue.quantity - currentValue.quantityReturned)), 0)
                const amountVariableExpense = amountInvoicing * totals.variable_expense_percentage
                const amountFixed = (amountInvoicing / totals.invoicing) * totals.fixed_expenses
                const fixedUnitExpense = amountFixed / (amountQuantity - amountQuantityReturned)
                const subgroupProfit = amountInvoicing - (amountCost + amountFixed + (amountInvoicing * totals.variable_expense_percentage))
                const discountPercentage = amountDiscount / amountInvoicing
                const invoicingPercentage = amountInvoicing / totals.invoicing
                const costPercentage = amountCost / totals.cost
                const fixedExpensePercentage = amountFixed / totals.fixed_expenses
                const subgroupProfitPercentage = subgroupProfit / totals.general_monetary_profit

                const newResumeSubgroup = new ResumeSubgroup(
                    item.codSubgroup,
                    item.nameSubgroup,
                    roundValues('round', amountQuantity - amountQuantityReturned, 2),
                    roundValues('round', amountQuantityReturned, 2),
                    roundValues('round', amountInvoicing, 2),
                    roundValues('round', amountCost, 2),
                    roundValues('round', amountDiscount, 2),
                    roundValues('round', amountFixed, 2),
                    roundValues('round', amountVariableExpense, 2),
                    roundValues('round', fixedUnitExpense, 2),
                    item.baseProfit,
                    roundValues('round', subgroupProfit, 2),
                    roundValues('round', discountPercentage, 2),
                    roundValues('round', invoicingPercentage, 2),
                    roundValues('round', costPercentage, 2),
                    roundValues('round', fixedExpensePercentage, 2),
                    roundValues('round', subgroupProfitPercentage, 2),
                    date

                )
                resumeSubgroup[item.nameProduct] = newResumeSubgroup.getAllResumeSubgroup()
            }
        })
/* 
        if(input){
            Object.entries(resumeSubgroup).forEach()
        } */
        return resumeSubgroup

    }

    public getSaleItem = async (input?: InputDateDTO) => {

        let initial: string | undefined
        let final: string | undefined
        let searchDatabase: InvoicingItemDB[] = []

        if (!input || (input && (!input.initial && !input.final))) {

            initial = "1970-01-01"
            final = new Date().toISOString()

            searchDatabase = await this.invoicingDatabase.getSaleItemByDate({ initialDate: initial, finalDate: final })

        } else if (input && (input.initial && !input.final)) {

            final = new Date().toISOString()
            searchDatabase = await this.invoicingDatabase.getSaleItemByDate({ initialDate: input.initial.toISOString(), finalDate: final })

        } else if (input && (!input.initial && input.final)) {

            initial = "1970-01-01"
            searchDatabase = await this.invoicingDatabase.getSaleItemByDate({ initialDate: initial, finalDate: input.final.toISOString() })

        } else if (input && (input.initial && input.final)) {
            searchDatabase = await this.invoicingDatabase.getSaleItemByDate({ initialDate: input.initial.toISOString(), finalDate: input.final.toISOString() })
        }


        return searchDatabase
    }
}