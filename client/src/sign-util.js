var Tx = require('ethereumjs-tx').Transaction;
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;

async function sendRaw (connection, rawTx, key) {
    var privateKey = Buffer.from(key, 'hex');
    var transaction = new Tx(rawTx, {'chain': 'rinkeby'});
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');

    await connection.eth.sendSignedTransaction(
        '0x' + serializedTx, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('tx hash: ' + result);
            }
        }
    ).catch(err => console.log(err));
}

module.exports = {
    callContractMethod: async function (
            account,
            privateKey,
            connection,
            contractAbi,
            contractAddress,
            methodName,
            methodParams
    ) {
        let nonce = await connection.eth.getTransactionCount(account);
        let gasPrice = await connection.eth.getGasPrice();
        var txOptions = {
            nonce: connection.utils.toHex(nonce),
            gasLimit: connection.utils.toHex(10000000),
            gasPrice: connection.utils.toHex(gasPrice * 1.40),
            to: contractAddress
        }

        var rawTx = txutils.functionTx(contractAbi, methodName, methodParams, txOptions);
        await sendRaw(connection, rawTx, privateKey);
    }
}
