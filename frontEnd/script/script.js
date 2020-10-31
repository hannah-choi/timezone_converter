
import Search from './search.js'
import TimezoneManager from './timezonemanager.js'

//import Search from './search.js'
const searchInput = document.querySelector('.searchInput')
const search = new Search()
const suggestionList = document.querySelector('.suggestionList')
const timezoneManager = new TimezoneManager()

//const hourList = new Hour(0)
searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})

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