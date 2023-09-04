const patternName = /^[a-zA-Z]+$/
export const nameValidation = new RegExp(patternName);

const patternSymbol = /^[A-Z]+$/
export const symbolValidation = new RegExp(patternSymbol);

const patternNumber = /^[0-9]+$/
export const numberValidation = new RegExp(patternNumber);
