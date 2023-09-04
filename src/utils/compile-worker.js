/* eslint-disable no-restricted-globals */
import wrapper from 'solc/wrapper';
import {getJsonInput} from "./json-input";

self.addEventListener('message', async (event) => {
    try {
        const {sourceCode, contractName, compilerVersion} = event.data;
        // eslint-disable-next-line no-undef
        importScripts(`https://binaries.soliditylang.org/bin/soljson-${compilerVersion}.js`)
        const compilerInput = getJsonInput({sourceCode, contractName});
        const compiler = wrapper(self.Module)
        let output = await compiler.compile(compilerInput);
        
        output = JSON.parse(output);
        const compiledContract =
            output.contracts[`${contractName}.sol`][contractName];
        const {abi} = compiledContract;
        const bytecode = compiledContract.evm.bytecode.object;
        self.postMessage({abi, bytecode});

    } catch (error) {
        self.postMessage({error});
    }


}, false)
