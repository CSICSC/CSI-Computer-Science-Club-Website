const HyperExpress = require('hyper-express');
const path  = require("node:path");
const fs = require("node:fs");
const { removeSuffix } = require('./utils');

const webserver = new HyperExpress.Server();

const PORT = 3000;
const ROOT = '/';

for(let p of fs.readdirSync("html")) {
    if(p === "." || p === "..") continue;
    if(p === "index.html") {
        webserver.get('/', (req, res) => {
            return res.sendFile(path.join(__dirname, "/html/index.html"));
        });
    }else {
        webserver.get(`/${removeSuffix(p)}`, (_, res) => {
            return res.sendFile(path.join(__dirname, `/html/${p}`));
        });
    }
}

for(let p of fs.readdirSync("css")) {
    if(p === "." || p === "..") continue;
    else {
        console.log(`/css/${p}`)
        webserver.get(`/css/${p}`, (_, res) => {
            return res.sendFile(path.join(__dirname, `/css/${p}`));
        });
    }
}

for(let p of fs.readdirSync("assets/images")) {
    if(p === "." || p === "..") continue;
    else {
        webserver.get(`/images/${p}`, (_, res) => {
            return res.sendFile(path.join(__dirname, `/assets/images/${p}`));
        });
    }
}

for(let p of fs.readdirSync("assets/fonts")) {
    if(p === "." || p === "..") continue;
    else {
        webserver.get(`/fonts/${p}`, (_, res) => {
            return res.sendFile(path.join(__dirname, `/assets/fonts/${p}`));
        });
    }
}

webserver.listen(PORT).then(() => console.log(`server running on port ${PORT}`)).catch((err) => console.log(`failed to to start server: ${err}`));
