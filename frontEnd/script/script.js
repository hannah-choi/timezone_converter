
import Timezone from './Timezone.js'
const timezoneComps = document.querySelectorAll('.timezoneComp')

timezoneComps.forEach((data)=>{
    data.innerHTML = new Timezone('Asia/Tokyo').render()
})

console.log(moment.tz('Europe/London').format('HH:mm'))

