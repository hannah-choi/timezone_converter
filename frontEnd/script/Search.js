class Search{

    constructor(timezoneDb){
        this.timezoneDb = timezoneDb
        this.suggestionList = document.querySelector('.suggestionList')
        this.matchArray = [];
    }

    findMatches(typedWord, timezoneDb){
        const regex = new RegExp(typedWord, 'gi')
        return timezoneDb.filter(timezone => timezone.match(regex))
    }

    displayMatches = (value) => {
        if(value.length === 0){
            this.suggestionList.style.border = 'none'
            this.suggestionList.opacity = '0'
            this.suggestionList.innerHTML = ''
        } else {
            this.matchArray = this.findMatches(value, this.timezoneDb)
            this.suggestionList.style.opacity = '1'
        }
        this.suggestionList.style.border = this.matchArray.length === 0 ? 'none':'1px solid gray'
        const list = this.matchArray.map(data => {
            const regex = new RegExp(value, 'gi')
            let timezoneName = data.replace(regex, `<span class="highlight">${value}</span>`)
            return `
                <li class= "suggestionItem">
                <span class="listTimezone">${timezoneName}</span></li>
            `
        }).join('')
        this.suggestionList.innerHTML = list
    }
}

export default Search