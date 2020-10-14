import Timezone from './timezone.js'
const timezoneList = document.querySelector('.timezoneList')

let cityArray = [
    {city: 'Asia/Seoul'},
    {city: 'Europe/Berlin'},
    {city: 'America/Mexico_city'},
    {city: 'Asia/Jerusalem'}
]

const cityList = cityArray.map(city => new Timezone(city.city))
const timezoneRender = cityList.map(city => city.render()).join('')

timezoneList.innerHTML = timezoneRender

// timezoneComps.forEach((data)=>{
//     data.innerHTML = new Timezone('Asia/Tokyo').render()
// })

