const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      const projectId = getProjectId();
      const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
      resolve(web3);
    });
  });
};

const getGreetingContract = async (web3) => {
  const data = await $.getJSON("./contracts/Greeting.json");

  const contract = new web3.eth.Contract(
    data.abi,
    getGreetingContractAddress()
  );
  return contract;
};

const getEasyWalletContract = async (web3) => {
  const data = await $.getJSON("./contracts/EasyWallet.json");

  const contract = new web3.eth.Contract(
    data.abi,
    getEasyWalletContractAddress()
  );
  return contract;
};
