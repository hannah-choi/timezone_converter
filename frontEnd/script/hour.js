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
                const number = function(a,b){
                    let first = isNaN(a.textContent) === true? "00": Math.min(a.dataset.key,b.dataset.key)
                    let last = isNaN(b.textContent) === true? "00": Math.max(a.dataset.key,b.dataset.key)
                    return [first >= 100 ? first-100:first, last>=100? last-100:last]
                }
                const numbers = number(elements[0], elements[elements.length-1])
                const selectedHours = function(){
                    if(elements.length === 1){
                        return elements[0].textContent + ":00"
                    }
                    return numbers[0] + ":00 - " + numbers[1] + ":00"
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