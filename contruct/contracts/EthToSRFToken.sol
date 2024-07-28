// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SRFToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("SRF Token", "SRF") Ownable(initialOwner) {
        // 追加の初期設定が必要であればここに記述
    }

    // トークンを指定されたアドレスにミントする
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

contract DepositContract is Ownable {
    SRFToken public srfToken;

    constructor(SRFToken _srfToken, address initialOwner) Ownable(initialOwner) {
        srfToken = _srfToken;
    }

    // 入金のログイベント
    event Deposit(address indexed user, uint256 amount);

    // ETHを預けてSRFトークンを受け取る関数
    function deposit() external payable {
        require(msg.value > 0, "You need to deposit some ETH");
        uint256 tokenAmount = msg.value;
        srfToken.mint(msg.sender, tokenAmount);
        emit Deposit(msg.sender, tokenAmount);
    }

    // ETHを引き出す関数（オーナーのみ）
    function withdrawETH(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);
    }
}