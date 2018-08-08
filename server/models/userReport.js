const mongoose = require('mongoose');


const userReportSchema = mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    type: { type: String, default: '' },
    message: { type: String, default: '' },
    date: { type: Date, default: new Date() },
    likes: { type: Number, default: 0 },
    id: { type: String, default: '' }

});

const UserReport = mongoose.model('UserReport', userReportSchema);

module.exports = UserReport;