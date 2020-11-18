import TimezoneGroup from './timezoneGroup.js'
import Timezone from './timezone.js'
import Hour from './hour.js'

class TimezoneManager{

    constructor(){
        this.defaultTimezone = moment.tz.guess()
        this.defaultOffset = moment.tz(`${this.defaultTimezone}`).utcOffset()/60; 
        this.groupList = [];
        this.setTimezoneGroup = null;
    }

    getGMT(city){
        return moment.tz(city).utcOffset()/60
    }

    getDifference(city){
        let displayOffset = this.defaultOffset - this.getGMT(city)
        let difference = displayOffset < 1 ? `${displayOffset}`.replace('-','+') : '-' + (displayOffset);
        return difference;
    }

    addZone(target) {
        const cityName = target.dataset.zone.replace(' ','_');
        const zoneName = cityName.split('/')
        .map(data => data[0].toUpperCase() + data.substr(1).toLowerCase()).join('/');
        console.log(cityName, zoneName)
        this.setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        this.groupList.push(this.setTimezoneGroup)
    }

    changeZone = (city) => {
        this.defaultTimezone = city
        this.getDifference(city)
        const zoneName = city
        const cityName = city.toLowerCase()
        this.setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        //this.setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        // console.log(this.groupList.map(data=> data.timezone.offset))
        // console.log(this.groupList.map(data=> data.hour.offset))
    }

}

export default TimezoneManager;