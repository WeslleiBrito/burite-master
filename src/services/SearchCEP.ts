import axios from "axios";
import { AddressInputDTO } from "../types/types";

export class SearchCEP {

    public getCep = async (addresses: AddressInputDTO[]) => {
        for (const address of addresses) {
          const cleanedCep = address.cep.replace(/[^a-zA-Z0-9]/g, '');
          await axios.get(`https://brasilapi.com.br/api/cep/v1/${cleanedCep}`);
        }
    }
   
}