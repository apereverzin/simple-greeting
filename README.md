# simple-greeting
Unlike the <a href="https://github.com/apereverzin/greeting">greeting</a> project simple-greeting allows to call the method of the smart contract without invoking Metamask pop-up dialogue.

Avoiding Metamask pop-up is based on using <a href="https://github.com/apereverzin/easy-wallet">easy-wallet</a> smart contract to store encrypted private keys.

To run the application go to <i>client</i> directory and run

`npm start`

This will start the web application which is aware of `Greeting` and `EasyWallet` smart contracts deployed to the `rinkeby` Ethereum test network (the addresses of both contracts are hard coded in `secrets.js`). The dialog screen displays the current value of `greeting`. You can update this value by typing a new greeting in the text box and pressing the `submit` button - the new value will be displayed if you refresh the screen after the transaction has been mined (you can see the transaction hash in the console of the browser, press F12 to see the console).

If you ran the <a href="https://github.com/apereverzin/greeting">greeting</a> application - Metamask confirmation dialogue should popped-up but with this application the transaction is signed with the private key of issuer account (the value of this account is also hard coded in `secrets.js`).

The private key has been stored in <a href="https://github.com/apereverzin/easy-wallet">easy-wallet</a> smart contract previously using the password hard coded in `secrets.js`. This password is used to decrypt the private key.

`bundle.js` file was created using this command (from `client` directory)

`browserify src/sign-util.js --s sign -o src/bundle.js`

`sign-util.js` file is not necessary after running `browserify` but kept here for clarity.

See <a href="http://browserify.org/">browserify.org</a> for details of using `browserify`.
