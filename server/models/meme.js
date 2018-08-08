const mongoose = require('mongoose');

const commonMemeSchema = require('./commonMemeSchema');

const memeSchema = mongoose.Schema(commonMemeSchema)

const Meme = mongoose.model('Meme', memeSchema)


module.exports = Meme;