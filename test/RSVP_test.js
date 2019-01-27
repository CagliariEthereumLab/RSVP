const util = require('util');


var keccak256 = artifacts.require("./Keccak256.sol");
var rsvp = artifacts.require("./RSVP.sol");

contract("Step 1", async accounts => {

    let Keccak256;
    let RSVP;

    let stakes = [
        "uno",
        "due",
        "tre",
        "quattro"
    ];


    before(async function () {
        RSVP = await rsvp.new();
        Keccak256 = await keccak256.new();
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
