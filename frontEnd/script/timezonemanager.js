import TimezoneGroup from './timezoneGroup.js'

import Timezone from './timezone.js'
import Hour from './hour.js'
import DragSelect from './lib/DragSelect.es6m.js'

class TimezoneManager{

    constructor(){
        this.cityArray = [];
        this.hourList = [];
        this.defaultTimezone = moment.tz.guess()
        this.defaultOffset = moment.tz(`${this.defaultTimezone}`).utcOffset()/60; 
        this.suggestionList = document.querySelector('.suggestionList')
        this.searchInput = document.querySelector('.searchInput')
        this.index = null;
        this.groupList = [];
    }

    static cityList = [];
    static selectedHours = null;

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
        
        const setTimezoneGroup = new TimezoneGroup(new Timezone(zoneName, this.getDifference(zoneName)), new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        this.groupList.push(setTimezoneGroup)
        
        this.suggestionList.innerHTML = '';
        this.searchInput.value = '';
    }


    
}

export default TimezoneManager;