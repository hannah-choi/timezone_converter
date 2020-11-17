import DragSelect from './lib/DragSelect.es6m.js'

class Hour{
    constructor(city, offset, gmt, ds){
        this.city = city
        this.offset = offset
        this.gmt = gmt
        this.ds =  ds
        this.div = null
    }

    getNow(){
        return parseInt(moment.tz(`${this.city}`).format('HH'))
    }

    getCurrentTime(){
        return moment.tz(`${this.city}`).format('HH:mm')
    }

    getToday(){
        return moment.tz(`${this.city}`).format('DD MMM')
    }

    getTomorrow(){
        return moment.tz(`${this.city}`).add(1, 'days').format('DD MMM')
    }

    getClass(i){
        return `${i === 0 ? 'date':''} ${i===this.getNow()? 'today':''}`
    }

    getDate(i){
        return i === 0 ? (this.gmt < 0 ? this.getTomorrow():this.getToday()) :i
    }

    getHours(){
        let hours = '';
        let number = this.offset < 0 ? (24 + this.offset) : this.offset
        for(let i = number; i < 24; i++){
            hours += `<span class = "selectable ${this.getClass(i)}">${i === 0 ? this.getToday():i}</span>`
        }
        for(let i = 0; i < number; i++){
            hours += `<span class="selectable ${this.getClass(i)}">${this.getDate(i)}</span>`
        }
        return hours;
    }

    getDs(timeUpdate){ 
        new DragSelect({
            selectables: this.div.querySelectorAll(`.selectable`),
            callback: () => { 
                let selected = this.div.querySelectorAll('.ds-selected')
                let time = null
                const returnZero = function(number){
                    if(number.classList.contains('date')) {
                        return "00"
                    }
                    return number.textContent
                }
               
                if (selected.length === 0){
                    time = this.getCurrentTime()
                } else if(selected.length === 1){
                    time = returnZero(selected[0]) + ":00"
                } else {
                    time = returnZero(selected[0]) + ":00 - " + returnZero(selected[selected.length-1]) + ":00"
                }
                timeUpdate(time)
             }
        })
    }

    render(){
        this.div = document.createElement('div')
        this.div.classList.add('hoursComp')
        this.div.innerHTML = `<div class="day">
                                 ${this.getHours()}
                            </div>`
        return this.div;
    }
}

export default Hour;