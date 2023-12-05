type TypeRounds = 'round' | 'floor' | 'ceil';

export function roundValues(type: TypeRounds, value: number, decimalQuantity: number = 0) {
  let result: number;

  switch (type) {
    case 'round':
      result = Math.round(value * Math.pow(10, decimalQuantity)) / Math.pow(10, decimalQuantity);
      break;
    case 'floor':
      result = Math.floor(value * Math.pow(10, decimalQuantity)) / Math.pow(10, decimalQuantity);
      break;
    case 'ceil':
      result = Math.ceil(value * Math.pow(10, decimalQuantity)) / Math.pow(10, decimalQuantity);
      break;
    default:
      throw new Error('Tipo de arredondamento inválido.');
  }

  return result;
}


  