const fs = require('fs');

const data = fs.readFileSync("./src/services/contracts/wagmi-gen-actions.ts").toString();
fs.writeFileSync("./src/services/contracts/wagmi-gen-actions.ts", data.replace("wagmi/codegen", "./codegen"));
console.log("Fixed imports for walletInterface connection");