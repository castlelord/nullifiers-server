const { Web3 } = require('web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const readline = require('readline');

// Connect to an Ethereum node (e.g., local Ganache, Infura)
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'));

// ABI and contract address
const abi = [/* ABI from compiled contract */{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "publicKey",
        "type": "bytes"
      }
    ],
    "name": "PublicKeyAdded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "requiredAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "publicKey",
        "type": "bytes"
      }
    ],
    "name": "addPublicKey",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

const contractAddress = '0x2C27bF754EC532f65f74D2910435d8c8BA2BEa09';

const contract = new web3.eth.Contract(abi, contractAddress);

let publicKeys = [];

contract.events.allEvents()
  .on('data', (event, error) => {
    if (error) {
        console.error(error);
        return;
    } 
    const publicKey = event.returnValues.publicKey;

    publicKeys.push(publicKey);

    const leaves = publicKeys.map(x => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    
    const root = tree.getRoot().toString('hex');

    console.log('Merkle Tree Root:', root);
    console.log('Leaves:', publicKeys);
});

