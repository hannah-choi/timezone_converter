import Timezone from './timezone.js'
import Hour from './hour.js'
import DragSelect from './lib/DragSelect.es6m.js'

class TimezoneManager{

    constructor(){
        this.cityArray = [];
        this.hourList = [];
        this.hoursList = document.querySelector('.hoursList')
        this.defaultTimezone = moment.tz.guess()
        this.defaultOffset = moment.tz(`${this.defaultTimezone}`).utcOffset()/60; 
        this.suggestionList = document.querySelector('.suggestionList')
        this.searchInput = document.querySelector('.searchInput')
        this.index = null;
    }

    static cityList = [];
    static selectedHours = null;
    static timezoneList = document.querySelector('.timezoneList')

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
        TimezoneManager.cityList.push(new Timezone(zoneName, this.getDifference(zoneName), TimezoneManager.selectedHours))
        TimezoneManager.timezoneList.innerHTML = TimezoneManager.cityList.map((city,i) => city.render(i)).join('');
        this.hourList.push(new Hour(zoneName, parseInt(this.getDifference(zoneName)), this.getGMT(cityName), Timezone.index))
        this.hoursList.innerHTML = this.hourList.map((hour) => hour.render()).join('')
        this.suggestionList.innerHTML = '';
        this.searchInput.value = '';
        let ds = new DragSelect({
            selectables: document.getElementsByClassName('selectable'),
            callback: function(elements) { 
                let hours = Array.from(elements).map(data => data.textContent);
                let index = elements[0].dataset.key
                Timezone.selectedHours = hours[0]+":00 - " + hours[hours.length-1] + ":00"
                TimezoneManager.cityList[index].time = Timezone.selectedHours
                TimezoneManager.timezoneList.innerHTML = TimezoneManager.cityList.map((city,i) => city.render(i)).join('');
            }
          });
        //let bindFunction =  ds.callback(this)
    }


    
}

export default TimezoneManager;