// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RealEstateToken is ERC20 {
    uint256 public totalDividendsDistributed;

    address[] private propertyOwners; // 不動産保有者のリスト
    address public platformManager;
    
    constructor() ERC20("Real Estate Token", "RET") {
        platformManager = msg.sender; // コントラクトを作成したアカウントがプラットフォームマネージャーになるように設定する
    }

    function deposit() external payable {
        if (msg.sender == platformManager) {
            distributeDividends(); // プラットフォームマネージャーからのETH入金で配当を分配
        } else {
            mintTokens(); // ユーザーからのETH入金でRETトークンを発行
        }
    }

    // ユーザーからETHを受け取り、RETトークンをミントして返す
    function mintTokens() internal {
        require(msg.value > 0, "Must send ETH to receive RET");
        _mint(msg.sender, msg.value);

        // 新しい保有者を追加
        bool exists = false;
        for (uint256 i = 0; i < propertyOwners.length; i++) {
            if (propertyOwners[i] == msg.sender) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            propertyOwners.push(msg.sender);
        }
    }

    // プラットフォームマネージャーがETHを入金すると、RETトークン保有者にETHを分配する
    function distributeDividends() internal {
        require(totalSupply() > 0, "No RET tokens exist");
        
        uint256 totalAmount = msg.value;

        // 正確な計算をするためにamountPerTokenを微小単位で計算
        uint256 amountPerToken = (totalAmount * 1e18) / totalSupply();
        totalDividendsDistributed += totalAmount;

        for (uint256 i = 0; i < propertyOwners.length; i++) {
            address account = propertyOwners[i];
            uint256 balance = balanceOf(account);
            if (balance > 0) {
                uint256 dividend = (balance * amountPerToken) / 1e18;
                (bool success, ) = account.call{value: dividend}("");  // 各保有者にETHを送信
                require(success, "Transfer failed");
            }
        }
    }
}
