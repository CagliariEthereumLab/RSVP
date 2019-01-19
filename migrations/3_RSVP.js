console.log("============================ RSVP");

var utils = require("../../../truffle-utils");

const contractFileName = "RSVP";
var Contract = artifacts.require("./" + contractFileName + ".sol");


module.exports = function (deployer, network, accounts) {

    console.log("network: " + network);
    console.log("Deploy with account address: " + accounts[0]);

    deployer.deploy(Contract)
        .then(() => {
            console.log("============================ RSVP DEPLOYED");
            return utils.writeAddress(accounts[0], network, Contract.address, contractFileName);
        });
};
