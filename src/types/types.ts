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
    plucro: number,
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
    plucro: number,
    subgroup_profit: number,
    discount_percentage: number,
    invoicing_percentage: number,
    cost_percentage: number,
    fixed_expense_percentage: number,
    subgroup_profit_percentage: number,
    updated_at: Date
}

export interface OpenPurchasesDB {
    num_NF: string,
    fornecedor: string,
    total_nf: number,
    data: string,
    item: number,
    codigo: number,
    prod_subgrupo: number,
    prod_dsubgrupo: string,
    prod_descricao: string,
    un: string,
    qtd_estoque: number,
    vr_compra: number,
    perc_custo: number,
    vr_custo: number,
    margem: number,
    vr_venda: number,
    desconto_max: number,
    vrcusto_medio: number,
    qtdentrada: number,
    vrcompra_novo: number,
    vrcustoagregado: number,
    fracao: number,
    vr_compra_fracionado: number,
    perc_custo_NF: number,
    vrvenda_novo: number
}

export interface OpenPurchasesModel {
    nf: string,
    provider: string,
    value: number,
    date: Date
}

export interface ProductsPrice {
    item: number,
    code: number,
    nameProduct: string,
    codeSubgroup: number,
    nameSubgroup: string,
    unit: string,
    costValue: number,
    fraction: number,
    inputQuantity: number,
    newSalePrice: number
}

export interface NF_Price {
    nf: string,
    total: number,
    date: Date,
    provider: string
    products: ProductsPrice[]
}

export interface ProductsNf extends ProductsPrice {
    expenseFixedUnit: number,
    expenseVariableUnit: number,
    discountPercentageMax: number,
    profitUnit: number,
    profitPercentage: number,
    commission: number,
    amountCost: number,
    amountInvoicing: number,
    amountDiscount: number,
    amountCommission: number,
    amountFixedExpense: number,
    amountVariableExepense: number,
    amountProfit: number
}

export interface NfPurchase {
    nf: string,
    total: number,
    date: Date,
    provider: string
    products: ProductsNf[]
}

export interface InputGeneratePrice {
    cost: number,
    expenseFixed: number,
    expenseVariable: number,
    commission: number,
    profit: number,
    discount: number
}