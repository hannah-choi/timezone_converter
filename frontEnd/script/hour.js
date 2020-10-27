class Hour{
    constructor(city, offset){
        this.city = city
        this.offset = offset
        //this.date = date;
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
        if(this.offset===0){
            for(let i = this.offset; i<24; i++){
                hours += `<span class=${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}>${i === 0 ? this.getToday():i}</span>`
            }
        }
        else if(this.offset<0){
            for(let i = (24 + this.offset); i < 24; i++){
                hours += `<span class = ${i===this.getNow()? 'focus':''}>${i}</span>`
            }
            for(let i = 0; i < (24 + this.offset); i++){
                hours += `<span class=${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}>${i === 0 ? this.getToday():i}</span>`
            }
        }
        else {
            for(let i = this.offset; i < 24; i++){
                hours += `<span class = ${i===this.getNow()? 'focus':''}>${i}</span>`
            }
            for(let i = 0; i < this.offset; i++){
                hours += `<span class=${i === 0 ? 'date':''} ${i===this.getNow()? 'focus':''}>${i === 0 ? this.getTomorrow():i}</span>`
            }
        }

        return hours;

        // for(let i = 0; i < (23 + this.offset); i++){
        //     hours += `<span ${i === 18 ? 'class="active hour"':'class="hour"'}>${i}</span>`
        // }


        // for(let i = this.startNumber; i<this.startNumber+24; i++){
        //     let number = `<span class="hour" data-tz="Asia/Seoul">${i}</span>`
        //     hourArray.push(number)
        // }
        
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