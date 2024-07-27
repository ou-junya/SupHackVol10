const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SRFTokenDeploymentModule", (m) => {
  // SRFTokenコントラクトをデプロイ。初期オーナーアドレスを指定
  const SRFToken = m.contract("SRFToken", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  // SRFTokenのアドレスとオーナーアドレスを使用してDepositContractをデプロイ
  const DepositContract = m.contract("DepositContract", [SRFToken, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]);

  return { SRFToken, DepositContract };
});