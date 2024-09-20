import { InputDateDTO } from "../dtos/InputDate.dto";
import { InvoicingBusiness } from "./InvoicingBusiness";

export class ProfitabilityBusiness {

    constructor(
        private invoicingBusiness: InvoicingBusiness,
    ) { }

    public resultByDate = async (input?: InputDateDTO) => {
        const result = await this.invoicingBusiness.getSaleItemByDate({
            initialDate: input?.initial,
            finalDate: input?.final
        })

        return result
    }
}