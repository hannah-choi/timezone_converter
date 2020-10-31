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
        return i === 0 ? (this.gmt < 0 ? this.getTomorrow() : this.getToday()) :i
    }

    getHours(){
        let hours = '';
        let number = this.offset < 0 ? (24 + this.offset) : this.offset
        for(let i = number; i < 24; i++){
            hours += `<span class = "${this.getClass(i)}">${i === 0 ? this.getToday():i}</span>`
        }
        for(let i = 0; i < number; i++){
            hours += `<span class="${this.getClass(i)}">${this.getDate(i)}</span>`
        }
        return hours;
    }

    render(){
        return `
            <div class="hoursComp">
                <div class="day">
                    ${this.getHours()}
                </div>
            </div>
        `
    }
}

export default Hour;