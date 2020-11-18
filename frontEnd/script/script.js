
import Search from './search.js'
import TimezoneManager from './timezonemanager.js'

const searchInput = document.querySelector('.searchInput')
const search = new Search()
const suggestionList = document.querySelector('.suggestionList')
const timezoneManager = new TimezoneManager()
const timezoneArea = document.querySelector('.timezoneList')

timezoneArea.addEventListener('click', ({target})=>{
    if(target.className != 'makeHome'){
        return;
    }
    timezoneManager.changeZone(target.dataset.city)
})

searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})
searchInput.addEventListener('focusout', (e) => {suggestionList.style.opacity = 0})

suggestionList.addEventListener('click', (e)=>{
    let target = null
    switch (e.target.className){
        case 'suggestionItem':
            target = e.target
            break;
        case 'listTimezone':
            target = e.target.parentElement
            break;
        case 'highlight':
            target = e.target.parentElement.parentElement
            break;
        default:
            return;
    }
    timezoneManager.addZone(target)
    search.disableSuggestion()
})


