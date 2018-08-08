
const _ = require('lodash')

// services
const newDataBaseService = require('../dataBase/DbService');
const StorageService = require('../services/StorageService');

// helpers
const helpers = require('../helpers/helpers');


const deleteApi = (app) => {

    app.delete('/api/user-suggested-memes', function (req, res) {

        newDataBaseService.removeMemeSuggestions();
        res.send(200);

    });


}

module.exports = deleteApi;