const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RealEstateFundModule", (m) => {
  // "RealEstateFund"コントラクトをデプロイするための設定
  const RealEstateFund = m.contract("RealEstateFund", []);

  return { RealEstateFund };
});