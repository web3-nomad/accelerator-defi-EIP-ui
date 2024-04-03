const fs = require('fs');

const data = fs.readFileSync("./src/services/contracts/wagmiGenActions.ts").toString();
fs.writeFileSync("./src/services/contracts/wagmiGenActions.ts", data.replace("wagmi/codegen", "./codegen"));
console.log("Fixed imports for walletInterface connection");