export interface InvoicingItemDB {
    produto: number
    venda: number
    descricao: string
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
    created_at: string,
    updated_at: string
}