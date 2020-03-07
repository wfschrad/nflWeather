//Application should make api calls to open-weather-map and present relevant weather
//data for NFL stadiums
//planned process flow:
//  1. setup target locations and corresponding api calls
//  2. fetch data from weather map
//  3. render data
//  4. re-retrieve data at relevant intervals

//Buffalo Bills Stadium: Orchard Park, NY

//require fetch

//----------------------------
//Parameters:
// coord
    // coord.lon City geo location, longitude
    // coord.lat City geo location, latitude
// weather (more info Weather condition codes)
    // weather.id Weather condition id
    // weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
    // weather.description Weather condition within the group. You can get the output in your language. Learn more
    // weather.icon Weather icon id
// base Internal parameter
// main
    // main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    // main.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    // main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    // main.humidity Humidity, %
    // main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    // main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    // main.sea_level Atmospheric pressure on the sea level, hPa
    // main.grnd_level Atmospheric pressure on the ground level, hPa
// wind
    // wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    // wind.deg Wind direction, degrees (meteorological)
// clouds
    // clouds.all Cloudiness, %
// rain
    // rain.1h Rain volume for the last 1 hour, mm
    // rain.3h Rain volume for the last 3 hours, mm
// snow
    // snow.1h Snow volume for the last 1 hour, mm
    // snow.3h Snow volume for the last 3 hours, mm
// dt Time of data calculation, unix, UTC
// sys
    // sys.type Internal parameter
    // sys.id Internal parameter
    // sys.message Internal parameter
    // sys.country Country code (GB, JP etc.)
    // sys.sunrise Sunrise time, unix, UTC
    // sys.sunset Sunset time, unix, UTC
// timezone Shift in seconds from UTC
// id City ID
// name City name
// cod Internal parameter




const fetch = require('node-fetch');

const weatherMapKey = `a509b5ac1e04c56be1d0e37fdaf7ca6d`;
const Bills_ZipCode = 14127;
const SLT_ZipCode = 96150;
const urlTemplate = `https://api.openweathermap.org/data/2.5/weather?zip=`//94040,us

async function getWeatherData(zips) {
    //const res = locations.map((zipCode) => {
        zips.forEach(async zipCode => {
            const url = urlTemplate + `${zipCode},us&APPID=${weatherMapKey}`;
            const res = await fetch(url)
                .then(res => res.json())
                .then(data =>console.log(data))
        });
}

//converts a kelvin temp to fahrenheit
function convertToFahren(kel) {
    return (9/5)*kel -459.67;
}

 async function runTest() {
    const zips = [96161, 68164];
    const res = await getWeatherData(zips);
    console.log(res);
}

runTest();


// function fetchWithHeader(url, headerKey, headerVal, fileName) {
//     console.log(`url: ${url}, headerKey: ${headerKey}, headerVal: ${headerVal}, fileName: ${fileName}`);
//     let myHeader = new Headers();
//     myHeader.append(headerKey, headerVal);
//     console.log(`myHeader: ${(myHeader)}`);
//     fetch(url, {header: myHeader})
//         .then(res => res.text())
//         .then(data => fsPromises.writeFile(fileName, data))
//         .catch(reason => console.log(`${reason}`));
// }


// function dumpHeader(url, fileName) {
// fetch(url)
//     .then(res => {
//         let myArray = [];
//         for (let [key, value] of res.headers.entries()) {
//             const line = `${key}: ${value}`;
//             myArray.push(line);
//         }
//         const data = myArray.join('\n');

//         fsPromises.writeFile(fileName, data);
//         return res;
//     })
//     .then(res => res.text())
//     .catch(reason => console.log(`${reason}`));
// }

// function sendData (url, string) {
//     //let newBlob = new Blob([string])
//     //console.log(`blob: ${newBlob}`)
//     fetch(url, {body: string, method: 'POST'})
//         .then(res => res.text())
//         .then(text => console.log(text))
//         .catch(reason => console.log(`Could not resolve host: ${reason}`));
// }