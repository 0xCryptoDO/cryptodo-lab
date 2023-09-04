export interface IGetJsonInputParams {
  sourceCode: string;
  contractName: string;
}
export function getJsonInput({
  sourceCode,
  contractName,
}: IGetJsonInputParams) {
  return JSON.stringify({
    language: 'Solidity',
    sources: {
      [`${contractName}.sol`]: {
        content: sourceCode,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
      },
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  });
}
