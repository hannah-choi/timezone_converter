class TimezoneGroup{

    constructor(timezone, hour){
        this.timezone = timezone;
        this.hour = hour;
        this.timezoneList = document.querySelector('.timezoneList')
        this.hoursList = document.querySelector('.hoursList')
        this.render()
    }


    render(){
        this.hourListRender()
        this.timezoneListRender()
    }

    hourListRender(){
        const temp = document.createElement('div')
        temp.innerHTML = this.hour.render()
        this.hoursList.appendChild(temp.children[0])
        this.getDs()
    }

    getDs(){
        this.hour.getDs(this.timezone.timeUpdate, this.timezoneListRender)
    }

    timezoneListRender(){
        const temp = document.createElement('div')
        temp.innerHTML = this.timezone.render()
        this.timezoneList.appendChild(temp.children[0])
    }

}

export default TimezoneGroup;

