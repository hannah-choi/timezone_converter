
import Search from './search.js'
import TimezoneManager from './timezonemanager.js'

const searchInput = document.querySelector('.searchInput')
const search = new Search()
const suggestionList = document.querySelector('.suggestionList')
const timezoneManager = new TimezoneManager()

searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})
searchInput.addEventListener('focusout', (e) => {suggestionList.style.opacity = 0})

suggestionList.addEventListener('click', (e)=>{
    switch (e.target.className){
        case 'suggestionItem':
            timezoneManager.addZone(e.target)    
            break;
        case 'listTimezone':
            timezoneManager.addZone(e.target.parentElement)
            break;
        case 'highlight':
            timezoneManager.addZone(e.target.parentElement.parentElement)
            break;
        default:
            return;
    }
})


