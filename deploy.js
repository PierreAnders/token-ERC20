const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require ('fs');
const { exit } = require('process');

const provider = new HDWalletProvider(
  'here your private key!',
  'https://mainnet.infura.io/v3/7639f51b590b413aa2ed95d7c207769a'
);

const web3 = new Web3(provider);

const abiPath = path.resolve(__dirname, 'bin', 'EducToken.abi');
const abi = fs.readFileSync(abiPath, 'utf8');

const bytecodePath = path.resolve(__dirname, 'bin', 'EducToken.bin');
const bytecode = fs.readFileSync(bytecodePath, 'utf8');

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '1000000'});
  console.log('Contract deployed to ', result.options.address);
  exit(0);
}

deploy();
