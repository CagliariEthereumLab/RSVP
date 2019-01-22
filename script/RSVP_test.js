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
const artifactKeccak256 = require('../build/Keccak256');


let accounts;
let account_admin;

let rsvpAddress;
let keccak256Address;

let stakes = [
    "uno",
    "due",
    "tre",
    "quattro"
];

async function init() {
    accounts = await utils.getAccounts();
    // accounts = await web3.eth.getAccounts();
    assert(accounts.length >= stakes.length, 'Per provare questo test assicurati di avere almeno 4 account');

    account_admin = accounts[0];

    console.log("accounts: " + accounts);
}

async function deploy() {

    let RSVP = utils.getContractByArtifact(artifactRSVP, account_admin);
    let Keccak256 = utils.getContractByArtifact(artifactKeccak256, account_admin);

    console.log('Attempting to deploy contract from account ', account_admin);

    result = await RSVP.new();
    rsvpAddress = result.address;
    console.log("RSVP address: " + rsvpAddress);

    result = await Keccak256.new();
    keccak256Address = result.address;
    console.log("Keccak256 address: " + keccak256Address);

}

async function insert() {

    let RSVP = await utils.getContractByAddress(artifactRSVP, account_admin, rsvpAddress);
    let Keccak256 = await utils.getContractByAddress(artifactKeccak256, account_admin, keccak256Address);

    for (let i = 0; i < stakes.length; i++) {
        let k = await Keccak256.getKeccak256(stakes[i]);
        let r = await RSVP.addCode(k);
        console.log("Stake " + stakes[i] + " added with tx: " + r.tx);
    }

}

async function verify() {

    let RSVP = await utils.getContractByAddress(artifactRSVP, account_admin, rsvpAddress);

    for (let i = 0; i < stakes.length; i++) {
        let r = await RSVP.verifyCode.call(stakes[i]);
        assert.equal(r, true);
        console.log("Stake " + stakes[i] + " verifyed!");
    }
}

async function reserve() {

    let RSVP = await utils.getContractByAddress(artifactRSVP, account_admin, rsvpAddress);

    for (let i = 1; i < stakes.length; i++) {
        let r = await RSVP.reserveSeat({from: accounts[i+1], value: web3.utils.toWei('0.010', 'ether')});
        console.log("Reserve stake for address: " + accounts[i] + " with tx " + r.tx);
    }
}

async function stop() {

    let RSVP = await utils.getContractByAddress(artifactRSVP, account_admin, rsvpAddress);
    let r = await RSVP.stopRSVP();
    console.log("Stop reservation with tx: " + r.tx);
}

async function unlock() {
    let RSVP = await utils.getContractByAddress(artifactRSVP, account_admin, rsvpAddress);
    for (let i = 1; i < stakes.length; i++) {
        let r = await RSVP.unlockStake(stakes[i], {from: accounts[i+1]});
        console.log("Unlock stake for address: " + accounts[i] + " with tx " + r.tx);
    }
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
        console.log("-----------------------------Insert");
        await insert();
    });

    it("Verify stakes", async () => {
        console.log("-----------------------------Verify");

        await verify();
    });

    it("Reserve stakes", async () => {
        console.log("-----------------------------Reserve");

        await reserve();
    });

    it("Stop reservation stakes", async () => {
        console.log("-----------------------------Stop");

        await stop();
    });

    it("Unlock stakes", async () => {
        console.log("-----------------------------Unlok");

        await unlock();
    });

});
