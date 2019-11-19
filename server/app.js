
var express = require('express');
var cors = require('cors');
var api = require('./api');
var app = express();
// body-parser를 사용합니다.
var bodyParser = require('body-parser');

app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/api', api);