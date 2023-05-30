const HyperExpress = require("hyper-express");
const path = require("path")

const webserver = new HyperExpress.Server();

const PORT = 3000;

webserver.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, "/html/index.html"));
});

webserver.listen(PORT).then(() => console.log(`server running on port ${PORT}`)).catch((err) => console.log(`failed to to start server: ${err}`));
