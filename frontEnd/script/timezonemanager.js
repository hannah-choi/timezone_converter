import TimezoneGroup from './timezoneGroup.js'
import Timezone from './timezone.js'
import Hour from './hour.js'

class TimezoneManager{

    constructor(){
        this.setDefault()
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
        this.setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        this.groupList.push(this.setTimezoneGroup)
    }

    setDefault(city = moment.tz.guess()){
        this.defaultTimezone = city
        this.defaultOffset = moment.tz(city).utcOffset()/60
    }

    changeZone(city){
        //console.log(this.groupList)
        this.setDefault(city)
        this.groupList = this.groupList.map(data => {
            data.remove()
            return new TimezoneGroup(new Timezone(data.hour.city, this.getDifference(data.hour.city)), new Hour(data.hour.city, parseInt(this.getDifference(data.hour.city)), this.getGMT(data.hour.city.toLowerCase())))
        })
        console.log(this.groupList)

        // const arr = ['a','b','c']
        // arr.map(data => `${data}1`)
        // console.log(arr)

        //this.getDifference(city)
        // let index = this.groupList.findIndex(data => data.hour.city === city)
        
        // const zoneName = city
        // const cityName = city.toLowerCase()
        
        // this.groupList[index].timezone.offset = this.getDifference(city)
        // this.groupList[index].hour.offset = parseInt(this.getDifference(zoneName))
        
        //this.setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        // console.log(this.groupList.map(data=> data.timezone.offset))
        // console.log(this.groupList.map(data=> data.hour.offset))
    }

}

export default TimezoneManager;