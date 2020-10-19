import Timezone from './timezone.js'
import Search from './search.js'
const timezoneList = document.querySelector('.timezoneList')
const searchInput = document.querySelector('.searchInput')
const timezoneDb = Object.keys(moment.tz._zones).map(data=> data.replace('_','/')).map(data=> data.replace('_',' '))
const search = new Search(timezoneDb)
 
let cityArray = [
    {city: 'Asia/Seoul'},
    {city: 'Asia/Hong_kong'},
    {city: 'Europe/Madrid'},
    {city: 'Asia/Jerusalem'},
    {city: 'America/Havana'},
]

const cityList = cityArray.map(city => new Timezone(city.city))
const timezoneRender = cityList.map(city => city.render()).join('')
timezoneList.innerHTML = timezoneRender

searchInput.addEventListener('input', (e) => {search.displayMatches(e.target.value)})

