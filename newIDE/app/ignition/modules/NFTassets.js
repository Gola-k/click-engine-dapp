const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');

const NFTassetsModule = buildModule('NFTassetsModule', m => {
  const nFTassets = m.contract('NFTassets');

  return { nFTassets };
});

module.exports = NFTassetsModule;
