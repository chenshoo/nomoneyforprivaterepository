const DateController = (()=> {

    const getDateAsString = (date = new Date())=> {

        const day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return `${day}_${month}_${year}`;
    };

    const getCurrentDate = () => getDateAsString();

    const getYesterdayDate = ()=> {
        const yesterdayDate = new Date().setDate(date.getDate() - 1);
        return getDateAsString(yesterdayDate);
    };

    const getWeekNumber = (d = new Date())=> {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0, 0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        // Get first day of year
        let yearStart = new Date(d.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    };

    const getCurrentWeekId = () => {

        const weekDetails = getWeekNumber(new Date()),
              weekNumber = weekDetails[1],
              year = weekDetails[0];
        return `${weekNumber}_${year}`;

    };


    return {
        getCurrentDate: getCurrentDate,
        getYesterdayDate: getYesterdayDate,
        getCurrentWeekId: getCurrentWeekId,
        getWeekNumber : getWeekNumber
    }


})();


module.exports = DateController;