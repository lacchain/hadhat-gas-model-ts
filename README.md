## Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
### Use LACChain Gas Model Provider

#### Extends the Hardhat Runtime Environment (hre)
In the hardhat.config.js import the extender:

```javascript
import "./extender";
```

This will include a **lacchain** property to the **hre**. 

To show the accounts defined in the config, use:

```javascript
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.lacchain.getSigners();
    
    for (const account of accounts) {
      console.log(account.address);
    }
});
```
### Configure network
You need to define the **nodeAddress** & **expiration** parameters that will be sent in every transaction to the node 
in the hardhat.config.js file. For example:

```json
{
   "lacchain": {
      "url": "http://34.69.22.82",
      "nodeAddress": "0xd00e6624a73f88b39f82ab34e8bf2b4d226fd768",
      "expiration": 1736394529,
      "gasPrice": 0,
      "privateKeys": [
         "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
         "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
         "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
      ]
   }
}
```

### Deploy contract & interact

1. In the test file include the lacchain **deployContract** function as follows:

    ```javascript
    import { lacchain } from "hardhat";
    ```

2. In your test case use the function as follows:
   ```javascript
   const accounts = lacchain.getSigners();
   const Greeter = await ethers.getContractFactory("Greeter", accounts[0]);
   const greeter = await lacchain.deployContract(Greeter, "Hello, world!");
   ```
3. Now you will be able to call functions to the **greeter** smart contract as usual:
    ```javascript
    expect(await greeter.greet()).to.equal("Hello, world!");
    ```
### Notes:

The extender uses internally the ```@lacchain/gas-model-provider```.

