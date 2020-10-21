import Timezone from './timezone.js'
import Search from './search.js'
import Hour from './hour.js'
//import Search from './search.js'
const timezoneList = document.querySelector('.timezoneList')
const hourComponent = document.querySelector('.hoursComp')
const searchInput = document.querySelector('.searchInput')
const timezoneDb = Object.keys(moment.tz._zones).map(data=> data.replace('_','/')).map(data=> data.replace('_',' '))
const search = new Search(timezoneDb)
const suggestionList = document.querySelector('.suggestionList')
 
let cityArray = [
    {city: 'Asia/Seoul'},
    {city: 'Asia/Hong_kong'},
    {city: 'Europe/Madrid'},
]

const cityList = cityArray.map(city => new Timezone(city.city))
timezoneList.innerHTML = cityList.map(city => city.render()).join('')

//const hourList = new Hour(0)
hourComponent.innerHTML = new Hour(0).render()

searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})

suggestionList.addEventListener('click', (e)=>{
    function addZone(target) {
        const zoneName = target.dataset.zone.replace(' ','_').split('/')
        .map(data => data[0].toUpperCase() + data.substr(1).toLowerCase()).join('/')
        cityList.push(new Timezone(zoneName))
        timezoneList.innerHTML = cityList.map(city => city.render()).join('')
    }
    switch (e.target.className){
        case 'suggestionItem':
            addZone(e.target)
            break;
        case 'listTimezone':
            addZone(e.target.parentElement)
            break;
        case 'highlight':
            addZone(e.target.parentElement.parentElement)
            break;
        default:
            return;
    }
})