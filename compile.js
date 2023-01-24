const path = require('path');
const fs = require('fs');
const solc = require('solc');

const educTokenPath = path.resolve(__dirname, 'contract', 'EducToken.sol');
const source = fs.readFileSync(educTokenPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
      'EducToken.sol': {
          content: source
      }
  },
  settings: {
    outputSelection: {
      '*': {
          '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['EducToken.sol']['EducToken'];

var dirName = 'bin';
const contractByteCodePath = path.join(dirName, 'EducToken.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'EducToken.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
