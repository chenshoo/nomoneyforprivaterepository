const _ = require('lodash');
const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const appArgs = require('minimist')(process.argv.slice(2));
const morgan = require('morgan');
const cors = require('cors')

const NODE_ENVIRONMENT = appArgs.env;
const isProduction = (!(NODE_ENVIRONMENT === 'development'));

// services
const StorageService = require('./server/services/StorageService');
const newDataBaseService = require('./server/dataBase/DbService');

// helpers
const helpers = require('./server/helpers/helpers');

// api
const getApi = require('./server/api/get');
const postApi = require('./server/api/post');
const putApi = require('./server/api/put');
const deleteApi = require('./server/api/delete');
const router = require('./server/router');



// init
StorageService.init(isProduction);
newDataBaseService.init({ isProduction });

// USE

app.use(cors())
app.use(bodyParser({ limit: '50mb' }));

app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(morgan('combined'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/build'))


// HEADERS

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type' , 'authorization')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})



app.use(function (req, res, next) {

    const isApiRequest = req.url.match(/\/api\/*/g);

    if (!isApiRequest) {
        res.sendFile(path.join(__dirname + '/build/index.html'));
    } else {
        next()
    }

})


getApi(app);
postApi(app);
putApi(app);
deleteApi(app);

// router
router(app);

// START

app.set('port', ( process.env.PORT || 8081 ))

app.listen(app.get('port'), function () {
    console.log('Node server is running on port ' + app.get('port'))

})












