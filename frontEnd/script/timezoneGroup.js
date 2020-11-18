class TimezoneGroup{

    constructor(timezone, hour){
        this.timezone = timezone;
        this.hour = hour;
        this.timezoneList = document.querySelector('.timezoneList')
        this.hoursList = document.querySelector('.hoursList')
        this.render()
    }

    changeDefaultZone(){
        this.timezone.change
        //this.timezone.
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

