console.log("============================ Keccak256 - migrations");

var utils = require("../../../truffle-utils");

const contractFileName = "Keccak256";
var Contract = artifacts.require("./" + contractFileName + ".sol");


module.exports = function (deployer, network, accounts) {

    console.log("network: " + network);
    console.log("Deploy with account address: " + accounts[0]);

    deployer.deploy(Contract)
        .then(() => {
            console.log("============================ Keccak256 DEPLOYED");
            return utils.writeAddress(accounts[0], network, Contract.address, contractFileName);
        });
};
