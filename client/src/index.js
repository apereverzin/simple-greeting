var web3;
var greetingContract;
var greetingContractAbi;
var easyWalletContract;
var easyWalletContractAbi;
var privateKey;

const displayGreeting = async (greeting) => {
  greeting = await greetingContract.methods.sayHello().call();
  $("h2").html(greeting);
};

const getPrivateKey = async () => {
  var res = await easyWalletContract.methods.getValue(getIssuerAccount()).call();
  var encryptedIssuerPrivateKey = JSON.parse(res);
  return web3.eth.accounts.decrypt(encryptedIssuerPrivateKey, getPassword()).privateKey.substring(2);
};

const updateGreeting = (greeting) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    sign.callContractMethod(
                getIssuerAccount(),
                privateKey,
                web3,
                greetingContractAbi,
                getGreetingContractAddress(),
                'updateGreeting',
                [input]
        );
    displayGreeting(greeting);
  });
};

async function greetingApp() {
  web3 = await getWeb3();
  greetingContract = await getGreetingContract(web3);
  easyWalletContract = await getEasyWalletContract(web3);
  const greetingContractData = await $.getJSON("./contracts/Greeting.json");
  greetingContractAbi = greetingContractData.abi;
  const easyWalletContractData = await $.getJSON("./contracts/EasyWallet.json");
  easyWalletContractAbi = easyWalletContractData.abi;
  privateKey = await getPrivateKey();

  let greeting;

  displayGreeting(greeting);
  updateGreeting(greeting);
}

greetingApp();
