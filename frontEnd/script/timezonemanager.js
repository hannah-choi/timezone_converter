import TimezoneGroup from './timezoneGroup.js'

class TimezoneManager{

    constructor(){
        this.setDefault()
        this.groupList = [];
        this.setTimezoneGroup = null;
    }

    addZone(target) {
        const cityName = target.dataset.zone.replace(' ','_');
        const zoneName = cityName.split('/')
        .map(data => data[0].toUpperCase() + data.substr(1).toLowerCase()).join('/');
        this.setTimezoneGroup = new TimezoneGroup(zoneName, this.getDifference(zoneName), this.getGMT(zoneName))
        this.groupList.push(this.setTimezoneGroup)
    }

    getDifference(city){
        let displayOffset = this.defaultOffset - this.getGMT(city)
        let difference = displayOffset < 1 ? `${displayOffset}`.replace('-','+') : '-' + (displayOffset);
        return difference;
    }

    getGMT(city){
        return moment.tz(city).utcOffset()/60
    }

    setDefault(city = moment.tz.guess()){
        this.defaultTimezone = city
        this.defaultOffset = moment.tz(city).utcOffset()/60
    }

    changeZone(city){
        this.setDefault(city)
        this.groupList = this.groupList.map(data => {
            data.remove()
            return new TimezoneGroup(data.city, this.getDifference(data.city), this.getGMT(data.city))
        })
    }

}
export default TimezoneManager;