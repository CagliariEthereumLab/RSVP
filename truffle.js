
module.exports = 
{
  "title": "RSVP",
  "networks": {
    "development": {
      "host": "127.0.0.1",
      "port": 8545,
      "network_id": "*",
      "gas": 3000000,
      "gasPrice": 50
    },
    "ganache": {
      "host": "127.0.0.1",
      "port": 9545,
      "network_id": "5777",
      "gas": 3000000,
      "gasPrice": 50
    },
    "ropsten": {
      "provider": "nel file .env",
      "network_id": 3,
      "gas": 3000000,
      "gasPrice": 50
    },
    "mainnet": {
      "provider": "nel file .env",
      "network_id": 1,
      "gas": 3000000,
      "gasPrice": 1100000000
    }
  }
};
