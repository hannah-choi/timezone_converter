import Timezone from './timezone.js'
const timezoneList = document.querySelector('.timezoneList')

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

// timezoneComps.forEach((data)=>{
//     data.innerHTML = new Timezone('Asia/Tokyo').render()
// })

