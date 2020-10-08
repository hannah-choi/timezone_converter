
let currentTimezone = moment.tz.guess();
let city = function(){return `${currentTimezone}`.split("/").pop();}
let now = function(){return moment().format('HH:mm')}
let today = function(){return moment().format('ddd, DD MMM')}
let countryName = function(){return moment.tz.zone(`${currentTimezone}`).countries()} 
let abbrTimezone = function(){return moment.tz(`${currentTimezone}`).format("z")}

console.log(city, now);
console.log(countryName);

const homeTime = document.querySelector('.homeTime')
const homeCity = document.querySelector('.homeCity')
const homeDate = document.querySelector('.homeDate')
const homeCode = document.querySelector('.homeCode')
const homeTimezone = document.querySelector('.abbrZone')

// const data = JSON.parse(localStorage.getItem('data'))
// console.log(data)

homeTime.innerHTML = now()
homeCity.innerHTML = city()
homeDate.innerHTML = today()
homeCode.innerHTML = countryName()
homeTimezone.innerHTML = abbrTimezone()

