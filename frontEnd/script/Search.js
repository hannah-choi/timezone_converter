class Search{

    constructor(timezoneDb){
        this.timezoneDb = timezoneDb
        this.suggestionList = document.querySelector('.suggestionList')
    }

    findMatches(typedWord, timezoneDb){
        return timezoneDb.filter(timezone => {
            const regex = new RegExp(typedWord, 'gi')
            return timezone.country.match(regex) || timezone.zones.find(zone => zone.match(regex))
        })
    }

    displayMatches = (value) => {
        let matchArray = this.findMatches(value, this.timezoneDb)
        if(value.length === 0){
            matchArray = [];
            this.suggestionList.innerHTML = '';
        }
        if(value.length === 0 || matchArray === [] || this.suggestionList.innerHTML === ''){
            this.suggestionList.style.opacity = '0'
        } else {
            this.suggestionList.style.opacity = '1'
        }
        this.suggestionList.style.border = "1px solid gray";
        const list = matchArray.map(data => {
            const regex = new RegExp(value, 'gi')
            const zoneName = data.zones[0].replace(regex, `<span class="highlight">${value}</span>`)
            const countryName = data.country.replace(regex, `<span class="highlight">${value}</span>`)
            return `
                <li class= "suggestionItem">
                <span class="listTimezone">${zoneName}</span><span class="listCountry">${countryName}</span></li>
            `
        }).join('')
        this.suggestionList.innerHTML = list
    }
}

export default Search