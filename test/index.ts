import { expect } from "chai";
// @ts-ignore
import { ethers, lacchain } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const accounts = lacchain.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter", accounts[0]);
    const greeter = await lacchain.deployContract(Greeter, "Hello, world!");

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
