
const fetch = require('node-fetch');
const urlTemplate = `https://api.openweathermap.org/data/2.5/weather?zip=`//94040,us

class WeatherFetcher {

    constructor () {
        this.weatherMapKey = `a509b5ac1e04c56be1d0e37fdaf7ca6d`;
    }

    async getWeatherObj(locations) {
            const weatherData = await Promise.all(locations.map(zipCode => {
                const url = urlTemplate + `${zipCode},us&APPID=${this.weatherMapKey}`;
                return fetch(url)
                    .then(res => res.json())
            }));
            return this.extractRelevantData(weatherData);
    }

    extractRelevantData(objArray) {
        console.log("obj:", objArray)
        const description = objArray[0].weather[0].description;
        const temp = this.convertToFahren(objArray[0].main.temp);
        const wind = objArray[0].wind.speed;
        const rain = objArray[0].rain;
        let rain1h;
        let rain3h;
        let snow1h;
        let snow3h;
        if (rain) {
            rain1h = rain['1h'];
            rain3h = rain['3h'];
        }
        const snow = objArray[0].snow;
        if (snow) {
            snow1h = snow['1h'];
            snow3h = snow['3h'];
        }
    
        const myWeatherObj = {
            description,
            temp,
            wind,
            // rain1h,
            // rain3h,
            // snow1h,
            // snow3h
        }
        //console.log(`myWeatherObj: ${JSON.stringify(myWeatherObj, null, 2)}`);
    }

    convertToFahren(kel) {
        return (9/5)*kel -459.67;
    }
}
async function runTest() {
    const wf = new WeatherFetcher();
    const res = await wf.getWeatherObj(['96151']);
    console.log('res', JSON.stringify(res, null, 2));
}

runTest();
module.exports = WeatherFetcher;