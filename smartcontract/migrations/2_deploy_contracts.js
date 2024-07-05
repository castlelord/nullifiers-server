const PublicKeyMerkleTree = artifacts.require("PublicKeyMerkleTree");
const EventEmitter = artifacts.require("EventEmitter");

module.exports = function(deployer) {
    deployer.deploy(PublicKeyMerkleTree);
    deployer.deploy(EventEmitter);
};
