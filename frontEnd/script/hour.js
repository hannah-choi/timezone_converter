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

    getHours(){
        let hours = '';
        let number = this.offset < 0 ? (24 + this.offset) : this.offset
        for(let i = number; i < 24; i++){
            hours += `<span data-key = ${i} class = "selectable ${this.getClass(i)}">${i === 0 ? this.getToday():i}</span>`
        }
        for(let i = 0; i < number; i++){
            hours += `<span data-key = ${i+100} class="selectable ${this.getClass(i)}">${this.getDate(i)}</span>`
        }
        return hours;
    }

    getDs(timeUpdate){ 
        new DragSelect({
            selectables: this.div.querySelectorAll(`.selectable`),
            callback: function(elements) { 
                if(elements.length === 0){
                    return;
                }
                const a = isNaN(elements[0].textContent) === true? "00" : elements[0].textContent
                const b = isNaN(elements[elements.length-1].textContent) === true? "00": elements[elements.length-1].textContent
                const selectedHours = function(){
                    if(elements.length === 1){
                        return elements[0].textContent + ":00"
                    }
                    return Math.min(a,b) + ":00 - " + Math.max(a,b) + ":00"
                }
                timeUpdate(selectedHours())
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