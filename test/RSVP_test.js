console.log("============================ RSVP_test.js - RSVP Test");
const util = require('util');


const contractFileName1 = "Keccak256";
var keccak256 = artifacts.require("./" + contractFileName1 + ".sol");

const contractFileName2 = "RSVP";
var rsvp = artifacts.require("./" + contractFileName2 + ".sol");

contract("Step 1", async accounts => {

    let Keccak256;
    let RSVP;

    let stakes = [
        "uno",
        "due",
        "tre",
        "quattro"
    ];

    it("Deploy contracts", async () => {
        Keccak256 = await keccak256.deployed();
        // console.log("Keccak256 deployed at: " + Keccak256.address);

        RSVP = await rsvp.deployed();
        // console.log("RSVP deployed at: " + RSVP.address);

    });

    it("Insert stakes", async () => {

        for (let i = 0; i < stakes.length; i++) {
            let k = await Keccak256.getKeccak256.call(stakes[i]);
            let r = await RSVP.addCode(k);
            console.log(util.inspect( r, {showHidden: false, depth: null}))

            // console.log("Added " + stakes[i]);
            // console.log("with hash " + k);

        }
    });

    it("Verify stakes", async () => {
        for (let i = 0; i < stakes.length; i++) {
            let r = await RSVP.verifyCode.call(stakes[i]);
            assert.equal(r, true);
        }
    });

});
