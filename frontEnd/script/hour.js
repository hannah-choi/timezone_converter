import Timezone from './timezone.js'

class Hour{
    constructor(city, offset, gmt, ds){
        this.city = city
        this.offset = offset
        this.gmt = gmt
        this.ds =  ds
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
        return `${i === 0 ? 'date':''} ${i===this.getNow()? 'ds-selected':''}`
    }

    getDate(i){
        return i === 0 ? (this.gmt < 0 ? this.getTomorrow():this.getToday()) :i
    }

    getSelected = () => {
        return this.ds.getSelection();
    }

    getHours(index){
        let hours = '';
        let number = this.offset < 0 ? (24 + this.offset) : this.offset
        for(let i = number; i < 24; i++){
            hours += `<span data-key = ${index} class = "selectable ${this.getClass(i)}">${i === 0 ? this.getToday():i}</span>`
        }
        for(let i = 0; i < number; i++){
            hours += `<span data-key = ${index} class="selectable ${this.getClass(i)}">${this.getDate(i)}</span>`
        }
        return hours;
    }


    getDs(timeUpdate){ 
        new DragSelect({
                    selectables: document.querySelectorAll(`div[data-key="${this.city}"] .selectable`),
                    callback: function(elements) { 
                        if(elements.length === 0){
                            return;
                        }
                        let hours = Array.from(elements).map(data => data.textContent)
                        let selectedHours = hours[0]+":00 - " + hours[hours.length-1] + ":00"
                        timeUpdate(selectedHours)
                    }
        })
    }

    render(){
        const div = document.createElement('div')
        div.classList.add('hoursComp')
        div.innerHTML = `<div class="day" data-key="${this.city}">
                            ${this.getHours()}
                         </div>`
        return div
    }
}



export default Hour;