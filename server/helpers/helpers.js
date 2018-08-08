/**
 * Created by nirbenya on 26/01/2018.
 */
const arrayToObjById = require('./arrayToObjById');
const getWeekNumber = require('./getWeekNumber');

class Helpers {

    constructor() {
        this.arrayToObjById = arrayToObjById;
        this.getWeekNumber = getWeekNumber;
    }

}


module.exports = new Helpers();