
class Timezone{
    constructor(city){
        this.currentTimezone = city
    }

    getCity(){
        return `${this.currentTimezone}`.split("/").pop().replace('_',' ')

    }

    getNow(){
        return moment.tz(`${this.currentTimezone}`).format('HH:mm')
    }

    getToday(){
        return moment.tz(`${this.currentTimezone}`).format('ddd, DD MMM')
    }

    getCountry(){
        return moment.tz.zone(`${this.currentTimezone}`).countries()
    }

    getAbbr(){
        return moment.tz(`${this.currentTimezone}`).format("z")
    }

    getHourNumber(){
        return parseInt(moment.tz(`${this.currentTimezone}`).format('HH')) < 10 ? moment.tz(`${this.currentTimezone}`).format('HH').slice(-1) : moment.tz(`${this.currentTimezone}`).format('HH')
    }

    render(){
        return `
            <div class="timezoneComp">
                <div class="home">
                    <img src="images/placeholder.svg">
                </div>
                <div class="timezone">
                    <div class="timezone1">
                        <span class="cityName homeCity">${this.getCity()}</span>
                        <span class="time homeTime">${this.getNow()}</span>
                    </div>
                    <div class="timezone2">
                        <span class="countryName homeCode">${this.getCountry()}</span>
                        <span class="abbrZone">${this.getAbbr()}</span>
                        <span class="date homeDate">${this.getToday()}</span>
                    </div>
                </div>
                <div class="modify">
                        <img src="images/cancel.svg" width="10px">
                </div>
            </div>
                `
    }
}

export default Timezone