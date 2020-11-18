import Timezone from './timezone.js'
import Hour from './hour.js'

class TimezoneGroup{

    constructor(city, offset, gmt){
        this.timezone = new Timezone(city, offset);
        this.hour = new Hour(city, parseInt(offset), gmt);
        this.city = city;
        this.timezoneList = document.querySelector('.timezoneList')
        this.hoursList = document.querySelector('.hoursList')
        this.render()
    }

    render(){
        this.hourRender()
        this.timezoneRender()
    }

    hourRender(){
        this.hoursList.appendChild(this.hour.render())
        this.getDs()
    }

    getDs(){
        this.hour.getDs(this.timezone.timeUpdate, this.timezoneRender)
    }

    remove(){
        this.hour.remove()
        this.timezone.remove()
    }

    timezoneRender(){
        this.timezoneList.appendChild(this.timezone.render())
    }

}

export default TimezoneGroup;

