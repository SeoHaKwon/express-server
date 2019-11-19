const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
var cors = require('cors');

const bodyParser = require('body-parser');
const api = require('./api');

const walletController = require('./controllers/wallet.controller');
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/api' , api);
const vhosts = [];
const vhost;
vhosts.push(express.vhost('127.0.0.1',app));
vhost = express.createServer.apply(this, vhosts);

/*
app.listen(3002, function () {
    console.log('CORS-enabled web server listening on port 3002')
});*/

vhost.listen(3001, function () {
	 console.log('CORS-enabled web server listening on port 3001')
});


