const hre = require('hardhat');

async function main() {
  const NFTassets = await hre.ethers.getContractFactory('NFTassets');
  const nFTassets = await NFTassets.deploy();

  await nFTassets.waitForDeployment();

  console.log('NFTassets deployed to:', nFTassets.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
