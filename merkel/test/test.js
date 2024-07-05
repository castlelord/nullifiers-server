const { Web3 } = require('web3');
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Connect to an Ethereum node (e.g., local Ganache, Infura)
const web3 = new Web3('http://localhost:8545');

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

// the private key must start with the "0x" prefix
const privateKeys = [
  "0x5562abbb8c0ad2b8ecd37789e19819282d2f29067f733fe13b06b72ff16b3bf7",
  "0x48dba9d6ceb8005ed649acd623bb3751e348eed18c5300563fcc47a4819b0e7f",
  "0xa5474647494df4d122479d6e6cf910f913f9b6c50d1f52c3e12288a702c38e3e",
  "0x8842963dfb7bf81afb86161b29b45cb3e93dac4823839f4671ce46f277ddb2a6",
  "0x42d85600572b7b513b8657f50284a60048e043be6ba07a0c0c7c189f731d58d0",
  "0x81cdff45b848605ec2e6314f4bdaf3729a1d3eafca9d2ce165b84aec84417fe7",
  "0x50b2fc472d5b09d6cb6fbe0c8afe10a305a22bd963d29a33564dadfd72ec3d7d",
  "0x8e1e0695490b7ac8ca3d6cd2d7d26d8e73bb9aeae815c66ceabe07440482df75",
  "0x6892a15baf7a7011adcc7fdd49f7ee7831fbbd104b55f6f988ce399f2d2279ae",
  "0x4df6f9f5b5d0dd148f053d438b4c9e061a47261186d1fd19b6aaf17010cf8fca"
];


const keyNum = 9;

const account = web3.eth.accounts.wallet.add(privateKeys[keyNum]);

console.log(account[0].privateKey);

// const publicKey = '0x04e92D8fc64c312b77c790940bCDb2964F49812E';
const publicKey = account[0].address
console.log(publicKey)

const sendTransaction = async () => {
    try {
        const tx = { 
            from: account[0].address,
            to: contractAddress, 
            value: web3.utils.toWei('1', 'ether'),
            data: contract.methods.addPublicKey(publicKey).encodeABI()
        };

        // Sign the transaction
        const txReceipt = await web3.eth.sendTransaction(tx);
        console.log('Transaction receipt:', txReceipt);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
};

// Execute the function
sendTransaction();