const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RealEstateFundModule", (m) => {
  // 必要な引数を指定してRealEstateFundコントラクトをデプロイ
  const RealEstateFund = m.contract("RealEstateFund", ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "ikeda-hushimi-building"]);

  return { RealEstateFund };
});