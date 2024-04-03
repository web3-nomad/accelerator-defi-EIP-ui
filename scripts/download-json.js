const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
dotenv.config();

const jsonUrl = process.env.SYNC_CONTRACTS_SOURCE_URL;

const getJson = async() => {
    console.log("Downloading json...");

    console.log(jsonUrl);
    const jsonData = await new Promise((resolve) => {
        https.get(jsonUrl, res => {
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
    fs.writeFileSync("./scripts/download-json.json", jsonData)
}

getJson().then(() => {
    process.stdout.write("Done\n\r");
    process.exit();
})