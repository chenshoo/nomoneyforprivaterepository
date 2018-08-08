const _ = require('lodash')

// services
const newDataBaseService = require('../dataBase/DbService');
const StorageService = require('../services/StorageService');

// helpers
const helpers = require('../helpers/helpers');

// controllers
const Authentication = require('../controllers/auth');


const post = (app) => {

    app.post('/api/update-meme-rating', function (req, res) {
        newDataBaseService.incrementMemeRating({ meme: req.body })
        res.sendStatus(200)
    })

    app.post('/api/save-new-meme', function (req, res) {
        StorageService.uploadNewMemeAndSaveToDataBase(req.body);
        res.sendStatus(200)
    });

    app.post('/api/delete-meme', function (req, res) {
        newDataBaseService.deleteMeme({ id: _.get(req, 'body.id') })
        res.sendStatus(200)
    })

    app.post('/api/save-user-meme', function (req, res) {
        StorageService.saveUserMeme(req.body).then(url => {
            res.send(url);
        });
    })

    app.post('/api/upload-suggested-new-meme', function (req, res) {
        StorageService.saveSuggestedMeme({ meme: req.body }).then(url => {
            res.status(200)
            res.send(url)
        })
    })

    app.post('/api/save-user-report', function (req, res) {
        newDataBaseService.saveUserReport({ report: req.body });
        res.status(200)
        res.send('saved user report')
    })

    app.post('/api/remove-user-generated-memes', function (req, res) {

        newDataBaseService.removeUserGeneratedMemes();

        res.send(200);
    })

    app.post('/api/items', function (req, res) {

        StorageService.addMemeItem({ item: req.body });

        res.send(200);
    });


}

module.exports = post;