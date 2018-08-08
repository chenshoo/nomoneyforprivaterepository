const _ = require('lodash')

// services
const newDataBaseService = require('../dataBase/DbService');

// helpers
const helpers = require('../helpers/helpers');


const get = (app) => {

    app.get('/api/get-weekly-popular-memes', function (req, res) {
        newDataBaseService.getWeeklyPopularMemes().then(memes => {
            res.send(memes)
        })
    })

    app.get('/api/category', function (req, res) {
        newDataBaseService.getCategory({ category: req.query.category }).then(memes => {
            res.send(memes)
        })
    })

    app.get('/api/search', function (req, res) {
        newDataBaseService.getSearchMemes({ description: req.query.search }).then(memes => {
            res.send(memes)
        })
    })

    app.get('/api/all-time-popular-memes', function (req, res) {
        newDataBaseService.getPopularMemes().then(memes => {
            res.send(memes)
        })
    })

    app.get('/api/new-memes', function (req, res) {
        newDataBaseService.getNewMemes().then(memes => {
            res.send(memes)
        })
    })

    app.get('/api/meme-suggestions', function (req, res) {
        console.log('get meme suggestions', req.query.category)
        newDataBaseService.getMemeSuggestions({ category: req.query.category, amount: req.query.size }).then(memes => {
            console.log('sending meme suggestions', _.size(memes))
            res.send(memes)
        })

    })

    app.get('/api/random-meme', function (req, res) {

        newDataBaseService.getRandomMeme().then(meme => {
            res.send(meme)
        })
    })

    app.get('/api/user-reports', function (req, res) {

        newDataBaseService.getUserReports().then(reports => {
            res.send(helpers.arrayToObjById(reports))
        })

    })

    app.get('/api/single-meme', function (req, res) {

        const id = _.get(req, 'query.id');

        if (id) {
            newDataBaseService.getSingleMeme({ id }).then(meme => {
                res.send(meme);
            })
        } else {
            res.send(404);
        }
    })

    app.get('/api/user-generated-memes', function (req, res) {
        newDataBaseService.getUserGeneratedMemes().then(memes => {
            console.log('sending generated memes to client', _.size(memes))
            res.send(memes);
        })
    });

    app.get('/api/user-suggested-memes', function (req, res) {
        newDataBaseService.getUserSuggestedMemes().then(memes => {
            console.log('sending suggested memes to client', _.size(memes))
            res.send(memes);
        })
    });

    app.get('/api/items', function (req, res) {

        newDataBaseService.getMemeItems().then(items => {
            res.send(items);

        });

    });

}

module.exports = get;