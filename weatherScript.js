//re-create a modified index.js to utilize weatherFetcher class
//create array of all potential stadium locations
//run array through filter to result in sub-array of relevant locations for a given fetch
//send array through weatherFetcher
//Use css to display results, highlighting specific features that may be of interest

const {nflZips} = require('./zipCodes.js');
const WeatherFetcher = require('./weatherFetcher.js');

const myWeatherFetcher = new WeatherFetcher();

//HTML SCRIPT
//[1,1,1,1] used as test filterArray
async function init() {
    const stadiumZips = filterLocations(nflZips, [1,1,1,1]);
    const myData = await myWeatherFetcher.getWeatherData(stadiumZips);
    console.log('myData: ', myData)
}
init();


function setLocationFilter(filter) {
    filter[0] = 1;
    filter[3] = 1;
}

function filterLocations(locations, filter) {
    return locations.filter((location, index) => location && filter[index]);
}

function runTest() {
    let locationFilter = new Array(nflZips.length).fill(0);
    setLocationFilter(locationFilter);
    const relevantZips = filterLocations(nflZips, locationFilter);
    console.log("relevant zips: ", relevantZips);
}

//runTest();