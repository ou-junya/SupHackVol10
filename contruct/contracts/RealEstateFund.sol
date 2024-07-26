// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateFund {
    address public owner;
    uint256 public totalInvested;
    mapping(address => uint256) public investments;
    address[] public investors;

    // イベントの定義
    event Invested(address investor, uint256 amount);
    event ProfitsDistributed(uint256 totalAmount, uint256 totalInvested);

    // コンストラクタ
    constructor() {
        owner = msg.sender;
    }

    // 投資受付
    function invest() public payable {
        require(msg.value > 0, "Investment amount must be greater than 0");

        if (investments[msg.sender] == 0) {
            investors.push(msg.sender);
        }

        investments[msg.sender] += msg.value;
        totalInvested += msg.value;

        emit Invested(msg.sender, msg.value);
    }

    // 利益分配 (オーナーのみ実行可能)
    function distributeProfits() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No profits to distribute");

        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint256 share = (investments[investor] * balance) / totalInvested;
            payable(investor).transfer(share);
        }

        emit ProfitsDistributed(balance, totalInvested);
    }

    // 投資額の取得
    function getInvestment(address investor) public view returns (uint256) {
        return investments[investor];
    }

    // オーナーの変更 (オーナーのみ実行可能)
    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    // オーナーの権限チェック
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
}