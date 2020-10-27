class Search{

    constructor(){
        this.timezoneDb = Object.keys(moment.tz._zones).map(data=> data.replace('_','/')).map(data=> data.replace('_',' '))
        this.suggestionList = document.querySelector('.suggestionList')
        this.matchArray = [];
    }

    findMatches(typedWord, timezoneDb){
        const regex = new RegExp(typedWord, 'gi')
        return timezoneDb.filter(timezone => timezone.match(regex))
    }

    displayMatches = (value) => {
        if(value.length === 0){
            this.suggestionList.style.opacity = '0'
            this.suggestionList.innerHTML = ''
        } else {
            this.matchArray = this.findMatches(value, this.timezoneDb).slice(0,10)
            this.suggestionList.style.opacity = '1'
        }
        this.suggestionList.style.border = this.matchArray.length === 0 ? 'none':'1px solid gray'
        const list = this.matchArray.map(data => {
            const regex = new RegExp(value, 'gi')
            let timezoneName = data.replace(regex, `<span class="highlight">${value}</span>`)
            return `
                <li class= "suggestionItem" data-zone="${data}">
                <span class="listTimezone">${timezoneName}</span></li>
            `
        }).join('')
        this.suggestionList.innerHTML = list
    }
}

export default Search