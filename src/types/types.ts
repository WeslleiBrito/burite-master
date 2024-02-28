export interface InvoicingItemDB {
    produto: number
    venda: number
    descricao: string
    prod_dsubgrupo: string
    prod_subgrupo: number
    plucro: number
    qtd: number
    qtd_devolvida: number
    vrunitario: number
    total: number
    vrcusto_composicao: number
    desconto: number
    fator: number
    dtvenda: string
}

export interface TotalValuesDB {
    id: string,
    invoicing: number,
    cost: number,
    fixed_expenses: number,
    variable_expenses: number,
    discount: number,
    general_monetary_profit: number,
    general_percentage_profit: number,
    created_at: string,
    updated_at: string,
    discount_percentage: number,
    variable_expense_percentage: number,
    number_of_months: number
}


export interface ResumeSubgroupModel {
    codSubgroup: number,
    nameSubgroup: string,
    amountQuantity: number,
    amountQuantityReturned: number,
    amountInvoicing: number,
    amountCost: number,
    amountDiscount: number,
    amountFixed: number,
    fixedUnitExpense: number,
    amountVariableExpense: number,
    subgroupProfit: number,
    discountPercentage: number,
    invoicingPercentage: number,
    costPercentage: number,
    fixedExpensePercentage: number,
    subgroupProfitPercentage: number,
    updatedAt: string
}

export interface ResumeSubgroupDB {
    cod_subgroup: number,
    name_subgroup: string,
    amount_quantity: number,
    amount_quantity_returned: number,
    amount_invoicing: number,
    amount_cost: number,
    amount_discount: number,
    amount_fixed: number,
    amount_variable: number,
    fixed_unit_expense: number,
    subgroup_profit: number,
    discount_percentage: number,
    invoicing_percentage: number,
    cost_percentage: number,
    fixed_expense_percentage: number,
    subgroup_profit_percentage: number,
    updated_at: Date
}