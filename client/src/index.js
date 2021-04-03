const displayGreeting = async (greeting, contract) => {
  console.log("-------displayGreeting1");
  greeting = await contract.methods.sayHello().call();
  console.log("-------displayGreeting2");
  $("h2").html(greeting);
  console.log("-------displayGreeting3");
};

const updateGreeting = (greeting, contract, accounts) => {
  let input;
  $("#input").on("change", (e) => {
    input = e.target.value;
  });
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    console.log("-------updateGreeting1");
    await contract.methods
      .updateGreeting(input)
      .send({ from: accounts[0], gas: 40000 });
    console.log("-------updateGreeting2");
    displayGreeting(greeting, contract);
    console.log("-------updateGreeting3");
  });
};

async function greetingApp() {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = await getContract(web3);
  let greeting;

  displayGreeting(greeting, contract);
  updateGreeting(greeting, contract, accounts);
}

greetingApp();
