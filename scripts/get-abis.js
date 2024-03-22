const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
dotenv.config();

const abis = process.env.CONTRACT_ABIS.split("\n");

const abisPath = "./src/assets/abi";

const getAbis = async() => {
    console.log("Clean up & make dir");
    fs.existsSync(abisPath) && fs.rmSync(abisPath, { recursive: true, force: true });
    fs.mkdirSync(abisPath, { recursive: true });

    console.log("Downloading abis...");
    for (abiUrl of abis) {
        if(abiUrl !== '') {
            console.log(abiUrl);
            const fileName = abiUrl.substring(abiUrl.lastIndexOf('/')+1);
            const abiData = await new Promise((resolve) => {
                https.get(abiUrl, res => {
                    const data = [];
                    console.log('HTTP ', res.statusCode);
                    if (res.statusCode !== 200) {
                        console.log('Download error');
                        process.exit(-1);
                    }
                    res.on('data', chunk => {
                        data.push(chunk);
                    });
                    res.on('end', () => {
                        console.log('Download completed');
                        resolve(Buffer.concat(data).toString());
                    });
                }).on('error', err => {
                    console.log('Error: ', err.message);
                    process.exit(-1);
                });
            });
            console.log("Writing to " + abisPath + "/" + fileName);
            fs.writeFileSync(abisPath + "/" + fileName, abiData);
        }
    }
}

getAbis().then(() => {
    process.stdout.write("Done\n\r");
    process.exit();
})