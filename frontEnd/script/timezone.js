
class Timezone{
    constructor(city, offset){
        this.currentTimezone = city
        this.offset = offset
        this.time = null;
        this.div = null;
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
        let countryName = moment.tz.zone(`${this.currentTimezone}`).countries()
        if(countryName.length > 1){ return countryName[1];}
        return countryName;
    }

    getAbbr(){
        return moment.tz(`${this.currentTimezone}`).format("z")
    }

    getOffset(){
        return moment.tz(`${this.currentTimezone}`).format("Z").split(':').shift()
    }

 
    timeUpdate = (time) => {
        this.time = time
        this.div.querySelector('.time').innerHTML = time
    }

    getHourNumber(){
        return parseInt(moment.tz(`${this.currentTimezone}`).format('HH')) < 10 ? moment.tz(`${this.currentTimezone}`).format('HH').slice(-1) : moment.tz(`${this.currentTimezone}`).format('HH')
    }

    render(){
        this.div = document.createElement('div')
        this.div.classList.add('timezoneComp')
        this.div.innerHTML  = `
            <div class="timezoneComp" >
                <div class="home">
                ${this.offset != 0 ? this.offset:'<img src="./../frontEnd/images/placeholder.svg">'}
                                    </div>
                <div class="timezone">
                    <div class="timezone1">
                        <span class="cityName homeCity">${this.getCity()}</span>
                        <span class="time homeTime">${this.time === null ? this.getNow():this.time}</span>
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
        return this.div
    }
}

export default Timezone