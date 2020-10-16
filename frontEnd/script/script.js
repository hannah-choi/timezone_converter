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

const countryNames = moment.tz._countries
console.log(countryNames) //원본데이터

const countries1 = Object.values(countryNames)
//const countries2 = Object.values(countryNames).map(data => data)
let map = countries1.map(data => data['country'])

//split('|')[0]
//console.log(countries1)
console.log(countries1)
console.log(map)

const timezoneDb = [];

fetch("./script/latest.json")
.then(res => res.json())
.then(data => timezoneDb.push(data))

function findMatches(typedWord, timezoneDb){
    return timezoneDb.filter(timezone => {
        const regex = new RegExp(typedWord, 'gi')
        return timezone.name.match(regex)
    })
}


// timezoneComps.forEach((data)=>{
//     data.innerHTML = new Timezone('Asia/Tokyo').render()
// })

