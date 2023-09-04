import { Net, Network, rpcUrls } from '@cryptodo/contracts';
import { providers, ContractFactory } from 'ethers';

function compileWithWorker(data: { contractName: string, sourceCode: string, constructorArgs: any, network: Network, testnet: boolean, compilerVersion: string }) {
  return new Promise<{ abi: any, bytecode: string }>((resolve, reject) => {
    const worker = new Worker(new URL('./compile-worker.js', import.meta.url));
    worker.onmessage = (event: MessageEvent) => {
      if (event.data.error) {
        reject(event.data.error);
      }
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };
    worker.postMessage(data);
  });
}

export async function compileContract({
  constructorArgs,
  compilerVersion,
  contractName,
  network,
  sourceCode,
  testnet
}: {
  contractName: string;
  sourceCode: string;
  constructorArgs: any;
  network: Network;
  testnet: boolean;
  compilerVersion: string;
}) {
  const { abi, bytecode } = await compileWithWorker({
    contractName,
    sourceCode,
    constructorArgs,
    network,
    testnet,
    compilerVersion
  })
  const net: Net = testnet ? 'testnet' : 'mainnet';
  const provider = new providers.JsonRpcProvider(
    rpcUrls[ network ][ net ]
  );
  const factory = new ContractFactory(
    abi,
    bytecode,
    provider.getSigner(),
  );
  const transaction = await factory.getDeployTransaction(
    ...Object.values(constructorArgs),
  );
  return { data: transaction.data, abi }
}