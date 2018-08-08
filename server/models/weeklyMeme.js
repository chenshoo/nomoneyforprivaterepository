
const mongoose = require('mongoose');
const commonMemeSchema = require('./commonMemeSchema');

const weeklyMemeSchema = mongoose.Schema({
    ...commonMemeSchema,
    week: { type: Number }
});

const WeeklyMeme = mongoose.model('WeeklyMeme', weeklyMemeSchema)


module.exports = WeeklyMeme;