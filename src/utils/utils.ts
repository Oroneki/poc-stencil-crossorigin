import * as yup from 'yup';

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const placaValidator = yup
  .string()
  .length(7, 'placa deve ter 7 caracteres')
  .matches(/[A-Za-z]{3}\d{4}/, 'Placa deve ser no formato AAA0000');
