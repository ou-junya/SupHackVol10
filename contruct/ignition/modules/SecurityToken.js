const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RealEstateTokenModule", (m) => {
  // RealEstateTokenコントラクトをデプロイ
  const RealEstateToken = m.contract("RealEstateToken");

  return { RealEstateToken };
});
