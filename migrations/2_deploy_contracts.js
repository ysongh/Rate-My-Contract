const ContractNFT = artifacts.require("ContractNFT");

module.exports = function(deployer){
  deployer.deploy(ContractNFT);
}