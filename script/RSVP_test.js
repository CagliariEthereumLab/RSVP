/**
 * Created by NormaN on 21/01/19
 * for CagliariEthereumLab
 **/

const Web3 = require('web3');
const assert = require('assert');

var utils = require("../../../truffle-utils");
var config = require("../truffle");
const network = process.env.NETWORK;

const net_conf = config.networks[network];

var web3 = utils.getWeb3(net_conf);

const artifactRSVP = require('../build/RSVP');


let accounts;
let account_admin;
let rsvpAddress;

let stakes = [
    "uno",
    "due",
    "tre",
    "quattro"
];


async function init() {
    accounts = await utils.getAccounts();
    // accounts = await web3.eth.getAccounts();
    account_admin = accounts[0];

    console.log("accounts: " + accounts);
}

async function deploy() {

    let RSVP = utils.getContractByArtifact(artifactRSVP, account_admin);

    console.log('Attempting to deploy contract from account ', account_admin);

    result = await RSVP.new();
    rsvpAddress = result.address;

    console.log("address: " + rsvpAddress);
}

async function insert() {

}

async function verify() {

}

async function reserve() {

}

async function stop() {

}

async function unlock() {

}

beforeEach(async () => {

});

describe('Test for blockchain start right', () => {

    it('Initialize', async () => {
        console.log("-----------------------------Init");
        await init();
    });

    it("Deploy contracts", async () => {
        console.log("-----------------------------Deploy");
        await deploy();
    });

    it("Insert stakes", async () => {
        console.log("-----------------------------Deploy");
        await insert();
    });

    it("Verify stakes", async () => {
        await verify();
    });

    it("Reserve stakes", async () => {
        await reserve();
    });

    it("Stop reservation stakes", async () => {
        await stop();
    });

    it("Unlock stakes", async () => {
        await unlock();
    });


});
