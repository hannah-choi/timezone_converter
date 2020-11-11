class TimezoneGroup{

    constructor(timezone, hour){
        this.timezone = timezone;
        this.hour = hour;
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

    timezoneRender(){
        this.timezoneList.appendChild(this.timezone.render())
    }

}

export default TimezoneGroup;

