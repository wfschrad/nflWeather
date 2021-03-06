//Application should make api calls to open-weather-map and present relevant weather
//data for NFL stadiums
//planned process flow:
//  1. setup target locations and corresponding api calls
//  2. fetch data from weather map
//  3. render data
//  4. re-retrieve data at relevant intervals

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

const weatherMapKey = `a509b5ac1e04c56be1d0e37fdaf7ca6d`;
//AFC East
const Bills_ZipCode = '14127';
const Dolphins_ZipCode = '33056';
const Jets_ZipCode = '07073';
const Patriots_ZipCode = '02035';

const urlTemplate = `https://api.openweathermap.org/data/2.5/weather?zip=`//94040,us
//--------------------------------------------------------------------------------------

function getWeatherData(locations) {
    //const res = locations.map((zipCode) => {
        return locations.map(zipCode => {
            const url = urlTemplate + `${zipCode},us&APPID=${weatherMapKey}`;
            return window.fetch(url)
                .then(res => res.json())
        });
}

//converts a kelvin temp to fahrenheit
function convertToFahren(kel) {
    return (9/5)*kel -459.67;
}

//extract relevant data from weather object for rendering
function extractWeatherData(obj) {
    const description = obj.weather[0].description;
    const temp = Math.round(convertToFahren(obj.main.temp));
    const wind = obj.wind.speed;
    const rain = obj.rain;
    const location = obj.name;
    let snow1h;
    let snow3h;
    let rain1h;
    let rain3h;
    
    const myWeatherObj = {
        description,
        temp,
        wind,
        location
        // rain1h,
        // rain3h,
        // snow1h,
        // snow3h
    }

    if (rain) {
        rain1h = rain['1h'];
        rain3h = rain['3h'];
    }
    const snow = obj.snow;
    if (snow) {
        snow1h = snow['1h'];
        myWeatherObj.snow1h= snow1h;
        snow3h = snow['3h'];
        myWeatherObj.snow3h= snow3h;
    }
    //console.log(`myWeatherObj: ${JSON.stringify(myWeatherObj, null, 2)}`);
    return myWeatherObj;
}

//html script
    //console.log('running');
    const locationEl = document.getElementById('location');
    const tempEl = document.getElementById('temp');
    const windEl = document.getElementById('wind');
    const conditionsEl = document.getElementById('conditions');

    const locationEl2 = document.getElementById('location2');
    const tempEl2 = document.getElementById('temp2');
    const windEl2 = document.getElementById('wind2');
    const conditionsEl2 = document.getElementById('conditions2');

    const locationEl3 = document.getElementById('location3');
    const tempEl3 = document.getElementById('temp3');
    const windEl3 = document.getElementById('wind3');
    const conditionsEl3 = document.getElementById('conditions3');

    //runTest();
    //let myTest;
    const locations = ['96151', Dolphins_ZipCode, Jets_ZipCode, Patriots_ZipCode];
    Promise.all(getWeatherData(locations))
        .then((res) => {
            //weather obj 1
            // console.log(`res: ${JSON.stringify(res, null, 2)}`)
            // console.log("after promiseAll");
            const myTest = extractWeatherData(res[0])
            locationEl.innerHTML += myTest.location;
            tempEl.innerHTML += myTest.temp;
            windEl.innerHTML += myTest.wind;
            conditionsEl.innerHTML += myTest.description;
            //console.log(`myTest: ${JSON.stringify(myTest, null, 2)}`)

            //weather obj 2
            const myTest2 = extractWeatherData(res[1])
            locationEl2.innerHTML += myTest2.location;
            tempEl2.innerHTML += myTest2.temp;
            windEl2.innerHTML += myTest2.wind;
            conditionsEl2.innerHTML += myTest2.description;

            //weather obj 3
            const myTest3 = extractWeatherData(res[2])
            locationEl3.innerHTML += myTest3.location;
            tempEl3.innerHTML += myTest3.temp;
            windEl3.innerHTML += myTest3.wind;
            conditionsEl3.innerHTML += myTest3.description;
        })
        // .then((myTest) => {
        //     temp.innerHTML+=myTest.wind;
        //     console.log(`myTest: ${JSON.stringify(myTest, null, 2)}`)
        // });
  
async function runTest() {
    const locations = [Bills_ZipCode, Dolphins_ZipCode, Jets_ZipCode, Patriots_ZipCode];
    const res = await Promise.all(getWeatherData(locations))
    extractWeatherData(res[0]);
}

runTest();