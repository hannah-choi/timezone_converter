
class Timezone{

    constructor(timezone){
        this.timezone = timezone
    }

    getNow(){
        return moment().format('HH:mm')
    }

    getToday(){
        return moment().format('ddd, DD MMM')
    }

    getCountry(){
        return moment.tz.zone(`${currentTimezone}`).countries()
    }

    getAbbr(){
        return moment.tz(`${currentTimezone}`).format("z")
    }

}

export default Timezone