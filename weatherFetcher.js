
//const fetch = require('node-fetch');
const urlTemplate = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const weatherMapKey = `a509b5ac1e04c56be1d0e37fdaf7ca6d`;

export class WeatherFetcher {

    constructor () {
        this.key = weatherMapKey;
    }

    async getWeatherData(locations) {
            let weatherDataArray = await Promise.all(locations.map(zipCode => {
                const url = urlTemplate + `${zipCode},us&APPID=${this.key}`;
                return fetch(url)
                    .then(res => res.json())
            }));
           // console.log(`weatherDataArray`, weatherDataArray)
            return this.extractRelevantData(weatherDataArray);
    }

    extractRelevantData(objArray) {
        //incorrect api key???
        console.log(`objArray: ${objArray}`);
        objArray.forEach((obj, index) => {
            const location = obj.name;
            const description = obj.weather[0].description;
            const temp = `${Math.round(this.convertToFahren(obj.main.temp))}F`;
            const wind = `${obj.wind.speed}mph`;
            const rain = obj.rain;
            let rain1h;
            let rain3h;
            let snow1h;
            let snow3h;
            
            const myWeatherObj = {
                location,
                description,
                temp,
                wind,
                // rain1h,
                // rain3h,
                // snow1h,
                // snow3h
            }

            if (rain) {
                rain1h = rain['1h'];
                rain3h = rain['3h'];
                myWeatherObj.rain1h = rain1h;
                myWeatherObj.rain3h = rain3h;
            }
            const snow = obj.snow;
            if (snow) {
                snow1h = snow['1h'];
                myWeatherObj.snow1h= snow1h;
                snow3h = snow['3h'];
                myWeatherObj.snow3h= snow3h;
            }

            objArray[index] = myWeatherObj;
         
        });
         return objArray;
    }

        // console.log("obj:", objArray)
        // const description = objArray[0].weather[0].description;
        // const temp = this.convertToFahren(objArray[0].main.temp);
        // const wind = objArray[0].wind.speed;
        // const rain = objArray[0].rain;
        // let rain1h;
        // let rain3h;
        // let snow1h;
        // let snow3h;
        // if (rain) {
        //     rain1h = rain['1h'];
        //     rain3h = rain['3h'];
        // }
        // const snow = objArray[0].snow;
        // if (snow) {
        //     snow1h = snow['1h'];
        //     snow3h = snow['3h'];
        // }
    
        // const myWeatherObj = {
        //     description,
        //     temp,
        //     wind,
        //     // rain1h,
        //     // rain3h,
        //     // snow1h,
        //     // snow3h
        // }
        //console.log(`myWeatherObj: ${JSON.stringify(myWeatherObj, null, 2)}`);

    convertToFahren(kel) {
        return (9/5)*kel -459.67;
    }
}
async function runTest() {
    const wf = new WeatherFetcher();
    const res = await wf.getWeatherData(['96151', '68164']);
    console.log('res', JSON.stringify(res, null, 2));
}

//runTest();
//module.exports = WeatherFetcher;