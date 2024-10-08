# Smart REIT Fund

## 実行方法

### 以下のコマンドを順に実行

#### hardhat nodeの起動
1. ターミナルの起動
2. コントラクトフォルダに移動  
`cd contruct`  
3. パッケージのインストール  
`npm install`  
4. ローカルノードの起動  
`npx hardhat node`  

#### コントラクトのデプロイ
1. ターミナルの起動  
2. コントラクトフォルダに移動  
`cd contruct`  
3. ノードにスマートコントラクトをデプロイ  
`npx hardhat ignition deploy ./ignition/modules/SecurityToken.js --network localhost`

#### フロントのサーバー起動
1. フロントフォルダに移動  
`cd smart-reit-fund`  
2. パッケージのインストール  
`npm install`  
3. サーバー起動  
`npm start`  

## metamask接続

### MetaMaskにネットワークを追加

MetaMaskを開き、設定から「ネットワークを追加」を選択。
### ネットワークの詳細を入力

新しいネットワークの設定を入力する。以下は設定の例：  
- ネットワーク名: 任意の名前（例: local）  
- 新しいRPC URL: http://localhost:8545  
- チェーンID: Hardhatのデフォルトは 31337   
- 通貨シンボル: ETH   
- ブロックエクスプローラーのURL: 空欄のままでOK  

### MetaMaskアカウントのインポート

nodeを起動した際に表示されるアカウントのうち Account #0 ~ #2 のアカウントをHardhatが生成した秘密鍵を使用してメタマスクにインポートする。  
この際ウォレット名をわかりやすいように追加時の名前から Account #0 ~ #2 の名前に変更すると良い。

## RET(RealEstateToken)トークンの動作確認
### RETトークンの取得
#### Account #1
1. フロントからAccount #1を接続する。
2. ウォレットからトークンをインポートを選択し、デプロイしたコントラクトアドレスを入力し、RETトークンをインポートする。
3. 「投資ページ」にてデプロイしたコントラクトアドレスと、40 ETHを入力する。
4. 「REITに投資する」ボタンを押すと、ウォレットに40 RET入っていることが確認できる。
#### Account #2
1. Account #1を接続解除し、Account #2を接続する。
2. ウォレットからトークンをインポートを選択し、デプロイしたコントラクトアドレスを入力し、RETトークンをインポートする。
3. 「投資ページ」にてデプロイしたコントラクトアドレスと、60 ETHを入力する。
4. 「REITに投資する」ボタンを押すと、ウォレットに60 RET入っていることが確認できる。
### 配当分配機能の動作確認
1. Account #2を接続解除し、Account #0を接続する。
2. 「配当支払い」ページにてデプロイしたコントラクトアドレスと、10 ETHを入力する。（ファンド運営者が100ETHを運用し収益10ETHを得た場合を想定）
3. このときの各アカウントの残高が以下のようになっていれば正常に動作している。なお実際にはガス代により以下の金額より多少少ない金額となる。
	- Account #0：10000 - 10 = 9990
	- Account #1：10000 - 40 + 10 * 40/(40+60) = 10000 - 40 + 4 = 9964 
	- Account #2：10000 - 60 + 10 * 60/(40+60) = 10000 - 60 + 6 = 9946

