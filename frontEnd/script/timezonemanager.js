import TimezoneGroup from './timezoneGroup.js'
import Timezone from './timezone.js'
import Hour from './hour.js'

class TimezoneManager{

    constructor(){
        this.defaultTimezone = moment.tz.guess()
        this.defaultOffset = moment.tz(`${this.defaultTimezone}`).utcOffset()/60; 
        this.suggestionList = document.querySelector('.suggestionList')
        this.searchInput = document.querySelector('.searchInput')
        this.groupList = [];
    }

    getGMT(city){
        return moment.tz(city).utcOffset()/60
    }

    getDifference(city){
        let displayOffset = this.defaultOffset - this.getGMT(city)
        let difference = displayOffset < 1 ? `${displayOffset}`.replace('-','+') : '-' + (displayOffset);
        return difference;
    }

    disableSuggestion(){
        this.suggestionList.innerHTML = '';
        this.searchInput.value = '';
    }

    addZone(target) {
        const cityName = target.dataset.zone.replace(' ','_');
        const zoneName = cityName.split('/')
        .map(data => data[0].toUpperCase() + data.substr(1).toLowerCase()).join('/');
        const setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        this.groupList.push(setTimezoneGroup)
        this.disableSuggestion()
    }

}

export default TimezoneManager;