class Hour{
    constructor(city, offset){
        this.city = city
        this.offset = offset
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

    getHours(){
        let hours = '';
        console.log(this.offset)
            for(let i = `${this.offset < 0? (24 + this.offset) : this.offset}`; i < 24; i++){
                hours += `<span class =${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}>${i === 0 ? this.getToday():i}</span>`
            }
            for(let i = 0; i < `${this.offset < 0? (24 + this.offset) : this.offset}`; i++){
                hours += `<span class=${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}>${i === 0 ? (this.offset < 0 ? this.getToday() : this.getTomorrow()) :i}</span>`
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