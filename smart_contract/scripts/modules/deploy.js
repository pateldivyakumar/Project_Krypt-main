// scripts/modules/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactory for your contract (assuming it's named "Transactions")
  const Transactions = await ethers.getContractFactory("Transactions");

  // Deploy the contract without any arguments because your constructor doesn't take any
  const transactions = await Transactions.deploy();

  // For ethers v5 (which your error trace suggests), use .address
  console.log("Transactions contract deployed to:", transactions.address);

  // If you are using ethers v6 and above, you would use .target like this:
  // console.log("Transactions contract deployed to:", transactions.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });