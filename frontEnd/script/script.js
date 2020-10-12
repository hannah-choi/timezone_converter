
const currentTimezone = moment.tz.guess();
const selectedTimezone = "Europe/London"
console.log(currentTimezone)
console.log(moment().tz(`${selectedTimezone}`));


const city = function(){return `${currentTimezone}`.split("/").pop();}
const now = function(){return moment().format('HH:mm')}
const today = function(){return moment().format('ddd, DD MMM')}
const countryName = function(){return moment.tz.zone(`${currentTimezone}`).countries()} 
const abbrTimezone = function(){return moment.tz(`${currentTimezone}`).format("z")}
let hourNumber = parseInt(moment().format('HH')) < 10 ? moment().format('HH').slice(-1) : moment().format('HH')

const homeTime = document.querySelector('.homeTime')
const homeCity = document.querySelector('.homeCity')
const homeDate = document.querySelector('.homeDate')
const homeCode = document.querySelector('.homeCode')
const homeTimezone = document.querySelector('.abbrZone')
const timeLineNode = document.querySelectorAll(`[data-tz="${currentTimezone}"]`)


const timeLine = Array.from(timeLineNode);

if(hourNumber){
    let currentHour = timeLine.find(data=> data.textContent === hourNumber)
    currentHour.classList.add('focus')
}

homeTime.innerHTML = now()
homeCity.innerHTML = city()
homeDate.innerHTML = today()
homeCode.innerHTML = countryName()
homeTimezone.innerHTML = abbrTimezone()

