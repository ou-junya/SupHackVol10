# Smart REIT Fund

## 実行方法

### 以下のコマンドを順に実行

コントラクトフォルダに移動  
`cd contruct`  
ローカルノードの起動  
`npx hardhat node`  
ノードにスマートコントラクトをデプロイ  
`npx hardhat ignition deploy ./ignition/modules/RealEstateFund.js`  

親フォルダに移動  
`cd ../`  

フロントフォルダに移動  
`cd smart-reit-fund`  
サーバー起動  
`npm start`  

## metamask接続

### MetaMaskにネットワークを追加

MetaMaskを開き、ネットワークの切り替えメニューから「カスタムRPC」を選択します。  
### ネットワークの詳細を入力

新しいネットワークの設定を入力します。以下は設定の例です：  
	•	ネットワーク名: 任意の名前（例: Localhost 8545）  
	•	新しいRPC URL: http://localhost:8545  
	•	チェーンID: Hardhatのデフォルトは31337、Ganacheのデフォルトは1337  
	•	通貨シンボル: 任意（例: ETH）  
	•	ブロックエクスプローラーのURL: 空欄のままでOK  

### MetaMaskアカウントのインポート

ローカルネットワークで使用しているアカウントをMetaMaskにインポートします。  
HardhatやGanacheが生成したプライベートキーを使用して、MetaMaskにアカウントを追加します。  
プライベートキーは0xで始まる長い文字列です。