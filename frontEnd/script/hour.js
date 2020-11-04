class Hour{
    constructor(city, offset, gmt){
        this.city = city
        this.offset = offset
        this.gmt = gmt
    }

    getNow(){
        return parseInt(moment.tz(`${this.city}`).format('HH'))
    }

    getToday(){
        return moment.tz(`${this.city}`).format('DD MMM')   
    }

    getTomorrow(){
        return moment.tz(`${this.city}`).add(1, 'days').format('DD MMM')
    }

    getClass(i){
        return `${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}`
    }

    getDate(i){
        return i === 0 ? (this.gmt < 0 ? this.getToday():this.getTomorrow()) :i
    }

    getHours(){
        let hours = '';
        let number = this.offset < 0 ? (24 + this.offset) : this.offset
        for(let i = number; i < 24; i++){
            hours += `<div class = "${this.getClass(i)} selection">${i === 0 ? this.getToday():i}</div>`
        }
        for(let i = 0; i < number; i++){
            hours += `<div class="${this.getClass(i)} selection">${this.getDate(i)}</div>`
        }
        return hours;
    }

    render(){
        return `
            <div class="hoursComp">
                <div class="day box-wrap">
                    ${this.getHours()}
                </div>
            </div>
        `
    }
}

export default Hour;