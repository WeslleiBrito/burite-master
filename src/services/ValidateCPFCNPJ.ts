
export class ValidateCPFCNPJ {

    public validate = (number: string): boolean => {
        number = number.replace(/\D/g, '');
  
        if (number.length === 11) {

            if (!/^\d{11}$/.test(number)) {
                return false;
            }
    
        
            let amount = 0;

            for (let i = 0; i < 9; i++) {
                amount += parseInt(number[i]) * (10 - i);
            }

            let rest = 11 - (amount % 11);

            if (rest === 10 || rest === 11) {
                rest = 0;
            }

            if (rest !== parseInt(number[9])) {
                return false;
            }
        
            amount = 0;

            for (let i = 0; i < 10; i++) {
                amount += parseInt(number[i]) * (11 - i);
            }

            rest = 11 - (amount % 11);
            if (rest === 10 || rest === 11) {
                rest = 0;
            }

            if (rest !== parseInt(number[10])) {
                return false;
            }

        } else if (number.length === 14) {
        
            if (!/^\d{14}$/.test(number)) {
                return false;
            }
    
            let weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            let amount = 0;

            for (let i = 0; i < 12; i++) {
                amount += parseInt(number[i]) * weight[i];
            }

            let rest = amount % 11;

            if (rest < 2) {

                if (parseInt(number[12]) !== 0) {
                    return false;
                }

            } else {

                if (parseInt(number[12]) !== 11 - rest) {
                    return false;
                }
            }
    
            amount = 0;
            weight = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
            for (let i = 0; i < 13; i++) {
                amount += parseInt(number[i]) * weight[i];
            }

            rest = amount % 11;

            if (rest < 2) {
                if (parseInt(number[13]) !== 0) {
                return false;
                }
            } else {
                if (parseInt(number[13]) !== 11 - rest) {
                return false;
                }
            }

        } else {

            return false;
        }
    
        return true;
    }
}
