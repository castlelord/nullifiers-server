const { Web3 } = require('web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Connect to an Ethereum node (e.g., local Ganache, Infura)
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));
// ABI and contract address
const abi = require("../../smartcontract/test/ee_abi.json");
const contractAddress = '0xd63DD9Bfb3eFc33b5D597146f077857333C52881';
const contract = new web3.eth.Contract(abi, contractAddress);

// the private key must start with the "0x" prefix
const account = web3.eth.accounts.wallet.add('0xdd7a8e6fa960224c81b6e80bf1e54698cefc5d7adc169d9b6fb32ad1f38b7edb');


contract.events.allEvents({ fromBlock: 0 }, (error, event) => {
  console.log(event)
})

