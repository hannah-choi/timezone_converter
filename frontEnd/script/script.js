
import Search from './search.js'
import TimezoneManager from './timezonemanager.js'

//import Search from './search.js'

// let ds = new DragSelect({
//     selectables: document.getElementsByClassName('selectable'),
//     callback: e => console.log(e)
//   });


const searchInput = document.querySelector('.searchInput')
const search = new Search()
const suggestionList = document.querySelector('.suggestionList')
const timezoneManager = new TimezoneManager()

//const hourList = new Hour(0)
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


