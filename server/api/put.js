const _ = require('lodash')

// services
const newDataBaseService = require('../dataBase/DbService');
const StorageService = require('../services/StorageService');

// helpers
const helpers = require('../helpers/helpers');


const put = (app) => {

    app.put('/api/update-user-report', function (req, res) {

        const before = _.get(req, 'body.likes');
        newDataBaseService.updateUserReportLikes({ report: req.body }).then((report = {}) => {
            console.log('update user message likes', before, report.likes)
            res.jsonp(report);
        })
    });

    app.put('/api/save-edited-meme', function (req, res) {
        console.log('edit meme start', req.body)
        newDataBaseService.updateMeme({ meme: req.body });
        res.send(200);
    })



}

module.exports = put;