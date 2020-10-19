class Search{

    constructor(timezoneDb){
        this.timezoneDb = timezoneDb
        this.suggestionList = document.querySelector('.suggestionList')
        this.matchArray;
    }

    findMatches(typedWord, timezoneDb){
        const regex = new RegExp(typedWord, 'gi')
        return timezoneDb.filter(timezone => timezone.match(regex))
    }

    displayMatches = (value) => {
        //let matchArray = value.length !== 0 ? this.findMatches(value, this.timezoneDb): [];
        if(value.length === 0){
            this.matchArray = [];
            this.suggestionList.style.opacity = '0'
        } else {
            this.matchArray = this.findMatches(value, this.timezoneDb)
            this.suggestionList.style.opacity = '1'}
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