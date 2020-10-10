
let currentTimezone = moment.tz.guess();
let city = function(){return `${currentTimezone}`.split("/").pop();}
let now = function(){return moment().format('HH:mm')}
let today = function(){return moment().format('ddd, DD MMM')}
let countryName = function(){return moment.tz.zone(`${currentTimezone}`).countries()} 
let abbrTimezone = function(){return moment.tz(`${currentTimezone}`).format("z")}

const homeTime = document.querySelector('.homeTime')
const homeCity = document.querySelector('.homeCity')
const homeDate = document.querySelector('.homeDate')
const homeCode = document.querySelector('.homeCode')
const homeTimezone = document.querySelector('.abbrZone')

homeTime.innerHTML = now()
homeCity.innerHTML = city()
homeDate.innerHTML = today()
homeCode.innerHTML = countryName()
homeTimezone.innerHTML = abbrTimezone()

