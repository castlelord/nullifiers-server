import { computeAllInputs, PlumeVersion } from 'plume-sig';
// import Wallet from 'ethereumjs-wallet';
var Wallet = require('ethereumjs-wallet');


const EthWallet = Wallet.default.generate();
console.log("address: " + EthWallet.getAddressString());
console.log("privateKey: " + EthWallet.getPrivateKeyString());
console.log(computeAllInputs("message", EthWallet.getPrivateKeyString()))
// return computeAllInputs(message, secretKey);