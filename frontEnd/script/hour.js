class Hour{
    constructor(startNumber){
        this.startNumber = startNumber;
        //this.date = date;
    }

    render(){
        let hourArray = []
        for(let i = this.startNumber; i<this.startNumber+24; i++){
            let number = `<span class="hour" data-tz="Asia/Seoul">${i}</span>`
            hourArray.push(number)
        }
        
        return `
            <div class="day">
            ${hourArray.join('')}
            </div>
        `
    }
}

export default Hour;