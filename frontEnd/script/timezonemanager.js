import Timezone from './timezone.js'
import Hour from './hour.js'

class TimezoneManager{

    constructor(){
        this.cityArray = [];
        this.cityList = [];
        this.hourList = [];
        this.timezoneList = document.querySelector('.timezoneList')
        this.hoursList = document.querySelector('.hoursList')
        this.defaultTimezone = moment.tz.guess()
        this.defaultOffset = moment.tz(`${this.defaultTimezone}`).utcOffset()/60; 
        this.suggestionList = document.querySelector('.suggestionList')
        this.searchInput = document.querySelector('.searchInput')
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
        const cityName = target.dataset.zone.replace(' ','_')
        const zoneName = cityName.split('/')
        .map(data => data[0].toUpperCase() + data.substr(1).toLowerCase()).join('/')
        this.cityList.push(new Timezone(zoneName, this.getDifference(zoneName)))
        this.timezoneList.innerHTML = this.cityList.map(city => city.render()).join('')
        this.hourList.push(new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName)))
        this.hoursList.innerHTML = this.hourList.map(hour=>hour.render()).join('')
        this.suggestionList.style.opacity = 0;
        this.searchInput.value = '';
        
    }
}

export default TimezoneManager;