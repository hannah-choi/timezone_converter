import Timezone from './timezone.js'
const timezoneList = document.querySelector('.timezoneList')
const searchInput = document.querySelector('.searchInput')
const suggestionList = document.querySelector('.suggestionList')
 
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

const timezoneDb = Object.entries(moment.tz._countries).map(([country, { zones }]) => ({
    country,
    zones
  }));;

  console.log(timezoneDb)

// fetch("./script/latest.json")
// .then(res => res.json())
// .then(data => timezoneDb.push(data))

function findMatches(typedWord, timezoneDb){
    return timezoneDb.filter(timezone => {
        const regex = new RegExp(typedWord, 'gi')
        return timezone.country.match(regex) || timezone.zones.find(zone => zone.match(regex))
    })
}

console.log(findMatches('isr',timezoneDb))

function displayMatches(){
    let matchArray = findMatches(this.value, timezoneDb)
    if(this.value.length === 0){
        matchArray = [];
        suggestionList.innerHTML = '';
    }
    if(this.value.length === 0 || matchArray === [] || suggestionList.innerHTML === ''){
        suggestionList.style.opacity = '0'
    } else {
        suggestionList.style.opacity = '1'
    }
    suggestionList.style.border = "1px solid gray";
    const list = matchArray.map(data => {
        const regex = new RegExp(this.value, 'gi')
        const zoneName = data.zones[0].replace(regex, `<span class="highlight">${this.value}</span>`)
        const countryName = data.country.replace(regex, `<span class="highlight">${this.value}</span>`)
        return `
            <li class= "suggestionItem">
            <span class="listTimezone">${zoneName}</span><span class="listCountry">${countryName}</span></li>
        `
    }).join('')
    suggestionList.innerHTML = list
}

searchInput.addEventListener('input', displayMatches)


// timezoneComps.forEach((data)=>{
//     data.innerHTML = new Timezone('Asia/Tokyo').render()
// })

